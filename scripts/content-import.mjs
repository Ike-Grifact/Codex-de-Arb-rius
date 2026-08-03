import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import {
  access,
  constants,
  copyFile,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  open,
  readFile,
  readdir,
  realpath,
  rm,
  stat,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  basename,
  dirname,
  extname,
  isAbsolute,
  join,
  relative,
  resolve,
  sep
} from "node:path";
import { fileURLToPath } from "node:url";
import {
  COLLECTION_SPECS,
  EXECUTABLE_EXTENSIONS,
  SAFE_ASSET_EXTENSIONS,
  classifyAssetReference,
  extractAssetReferences,
  hasLocalMachineReference,
  parseContentDocument,
  renderContentDocument,
  resolveFrontmatter,
  rewriteAssetReferences,
  validateContentSecurity,
  validateManifest
} from "./content-package-schema.mjs";
import { isGameSymbol } from "../src/data/game-symbols.mjs";
import {
  availabilityLabels,
  categoryLabels,
  originLabels,
  tagLabels
} from "../src/data/taxonomy.mjs";

export const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_ROOT_NAME = "_entrada-conteudo";
const MAX_MANIFEST_BYTES = 1024 * 1024;
const MAX_CONTENT_BYTES = 5 * 1024 * 1024;
const MAX_ASSET_BYTES = 25 * 1024 * 1024;
const MAX_PACKAGE_BYTES = 200 * 1024 * 1024;
const MAX_PACKAGE_FILES = 500;
const copyExclusive = constants.COPYFILE_EXCL;

const pathWithin = (candidate, parent) => {
  const difference = relative(resolve(parent), resolve(candidate));
  return difference === "" || (!difference.startsWith(`..${sep}`) && difference !== ".." && !isAbsolute(difference));
};

const packagePath = (root, portablePath) => resolve(root, ...portablePath.split("/"));
const repoPath = (root, ...segments) => resolve(root, ...segments);
const sha256 = (buffer) => createHash("sha256").update(buffer).digest("hex");
const existing = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};
const rel = (root, path) => relative(root, path).split(sep).join("/");
const unique = (values) => [...new Set(values)];

const walk = async (root) => {
  const files = [];
  const directories = [root];
  while (directories.length) {
    const directory = directories.pop();
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      const info = await lstat(path);
      const relativePath = rel(root, path);
      if (info.isSymbolicLink()) throw new Error(`Link simbólico proibido no pacote: ${relativePath}`);
      if (entry.isDirectory()) directories.push(path);
      else if (entry.isFile()) files.push({ path, relativePath, size: info.size });
      else throw new Error(`Tipo de arquivo não suportado no pacote: ${relativePath}`);
    }
  }
  return files;
};

const inspectAssetBytes = (buffer, extension, label) => {
  const errors = [];
  if (buffer.subarray(0, 2).toString("ascii") === "MZ" || buffer.subarray(0, 2).toString("ascii") === "#!") {
    errors.push(`${label} parece ser executável apesar da extensão.`);
    return errors;
  }
  const hex = buffer.subarray(0, 16).toString("hex");
  const ascii = buffer.subarray(0, 32).toString("ascii");
  if (extension === ".png" && !hex.startsWith("89504e470d0a1a0a")) errors.push(`${label} não possui assinatura PNG válida.`);
  if ([".jpg", ".jpeg"].includes(extension) && !hex.startsWith("ffd8ff")) errors.push(`${label} não possui assinatura JPEG válida.`);
  if (extension === ".gif" && !/^GIF8[79]a/.test(ascii)) errors.push(`${label} não possui assinatura GIF válida.`);
  if (extension === ".webp" && !(ascii.startsWith("RIFF") && ascii.slice(8, 12) === "WEBP")) {
    errors.push(`${label} não possui assinatura WebP válida.`);
  }
  if (extension === ".avif" && !buffer.subarray(4, 16).toString("ascii").includes("ftypavif")) {
    errors.push(`${label} não possui assinatura AVIF válida.`);
  }
  if (extension === ".svg") {
    const source = buffer.toString("utf8").replace(/^\uFEFF/, "").trimStart();
    if (!/^(?:<\?xml\b[^>]*>\s*)?<svg\b/i.test(source)) errors.push(`${label} não possui raiz SVG válida.`);
    const risks = [
      [/<\s*script\b/i, "contém <script>"],
      [/\son[a-z]+\s*=/i, "contém atributo de evento"],
      [/javascript\s*:/i, "contém URL javascript:"],
      [/<\s*foreignObject\b/i, "contém foreignObject"],
      [/<!DOCTYPE|<!ENTITY/i, "contém declaração ativa de entidade"],
      [/(?:href|src)\s*=\s*["'](?:file:|[A-Za-z]:[\\/]|\\\\)/i, "contém caminho local"]
    ];
    for (const [pattern, reason] of risks) if (pattern.test(source)) errors.push(`${label} ${reason}.`);
  }
  return errors;
};

const inspectTaxonomy = (manifest, frontmatter) => {
  const errors = [];
  for (const tag of manifest.tags) if (!tagLabels[tag]) errors.push(`Tag não catalogada em src/data/taxonomy.mjs: ${tag}.`);
  if (["guias", "materiais", "itens", "lore"].includes(manifest.collection)) {
    const origin = frontmatter.origin ?? frontmatter.sourceGuide;
    if (origin && !originLabels[origin]) errors.push(`Origem não catalogada em src/data/taxonomy.mjs: ${origin}.`);
  }
  if (manifest.collection === "itens" && frontmatter.category && !categoryLabels[frontmatter.category]) {
    errors.push(`Categoria de item não catalogada: ${frontmatter.category}.`);
  }
  if (manifest.collection === "lore" && frontmatter.category && !categoryLabels[frontmatter.category]) {
    errors.push(`Categoria de lore não catalogada: ${frontmatter.category}.`);
  }
  if (["materiais", "itens"].includes(manifest.collection) && frontmatter.availability && !availabilityLabels[frontmatter.availability]) {
    errors.push(`Disponibilidade não catalogada: ${frontmatter.availability}.`);
  }
  return errors;
};

const existingContentSlugs = async (repoRoot) => {
  const contentRoot = repoPath(repoRoot, "src", "content");
  const entries = [];
  const directories = [contentRoot];
  while (directories.length) {
    const directory = directories.pop();
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) directories.push(path);
      else if ([".md", ".mdx"].includes(extname(entry.name).toLowerCase())) {
        const source = await readFile(path, "utf8");
        const parsed = parseContentDocument(source, rel(repoRoot, path));
        if (parsed.frontmatter.slug) {
          entries.push({
            slug: parsed.frontmatter.slug,
            path,
            collection: rel(repoRoot, path).split("/")[2],
            visibility: parsed.frontmatter.visibility ?? "publico",
            status: parsed.frontmatter.status ?? "publicado"
          });
        }
      }
    }
  }
  return entries;
};

const validatePortalReferences = (body, entries, manifest) => {
  const errors = [];
  const loreSlugs = new Set(
    entries.filter((entry) => entry.collection === "lore").map((entry) => entry.slug)
  );
  const publicSlugs = new Set(
    entries
      .filter((entry) => entry.visibility === "publico" && entry.status === "publicado")
      .map((entry) => entry.slug)
  );
  if (manifest.collection === "lore") loreSlugs.add(manifest.slug);
  if (manifest.visibility === "publico" && manifest.status === "publicado") publicSlugs.add(manifest.slug);

  for (const token of String(body).matchAll(/\{\{([^}:]+)(?::([^}]+))?\}\}/g)) {
    const [, type, value] = token;
    if (type === "lore") {
      if (!value || !loreSlugs.has(value)) errors.push(`Include de lore desconhecido: ${value ?? "ausente"}.`);
      continue;
    }
    if (!isGameSymbol(type)) {
      errors.push(`Símbolo de jogo desconhecido: {{${type}${value === undefined ? "" : `:${value}`}}}.`);
      continue;
    }
    if (value !== undefined && (!/^\d+$/.test(value) || Number(value) < 1)) {
      errors.push(`Quantidade inválida no símbolo {{${type}:${value}}}.`);
    }
  }
  for (const link of String(body).matchAll(/\]\(guide:([a-z0-9-]+)\)/g)) {
    if (!publicSlugs.has(link[1])) errors.push(`Link guide: aponta para slug público inexistente: ${link[1]}.`);
  }
  return errors;
};
const inspectCollectionConfig = async (repoRoot, collection) => {
  const errors = [];
  const configPath = repoPath(repoRoot, "src", "content.config.ts");
  const config = await readFile(configPath, "utf8");
  const declaration = config.match(
    new RegExp(`const ${collection} = defineCollection\\(\\{([\\s\\S]*?)\\n\\}\\);`)
  )?.[1];
  if (!declaration) return [`A coleção ${collection} não foi encontrada em src/content.config.ts.`];

  const spec = COLLECTION_SPECS[collection];
  const expectedPattern = spec.extensions.includes(".mdx") ? "**/*.{md,mdx}" : "**/*.md";
  if (!declaration.includes(`pattern: "${expectedPattern}"`) || !declaration.includes(`base: "./src/content/${collection}"`)) {
    errors.push(`Loader de ${collection} divergiu das extensões ou pasta conhecidas pelo importador.`);
  }
  const publicEntry = config.match(/const publicEntry = z\.object\(\{([\s\S]*?)\n\}\);/)?.[1] ?? "";
  const relevantSchema = ["lore", "quests", "sessoes", "bestiario"].includes(collection)
    ? `${publicEntry}\n${declaration}`
    : declaration;
  const expectedFields = new Set([
    "title", "slug", "status", "visibility", "tags",
    ...Object.keys(spec.fixed),
    ...Object.keys(spec.mapped),
    ...spec.required,
    ...spec.optional
  ]);
  for (const field of expectedFields) {
    if (!new RegExp(`\\b${field}\\b`).test(relevantSchema)) {
      errors.push(`Campo esperado ausente no schema de ${collection}: ${field}.`);
    }
  }
  if (!/z\.enum\(\["publico",\s*"reservado",\s*"oculto"\]\)/.test(config)) {
    errors.push("Enum de visibility divergiu do schema conhecido pelo importador.");
  }
  if (!/z\.enum\(\["publicado",\s*"rascunho"\]\)/.test(config)) {
    errors.push("Enum de status divergiu do schema conhecido pelo importador.");
  }
  return errors;
};
const snapshotDirectory = async (directory, root) => {
  if (!(await existing(directory))) return new Map();
  const snapshot = new Map();
  for (const file of await walk(directory)) {
    const buffer = await readFile(file.path);
    snapshot.set(rel(root, file.path), sha256(buffer));
  }
  return snapshot;
};

const diffSnapshots = (before, after) => {
  const created = [];
  const modified = [];
  const removed = [];
  for (const [path, hash] of after) {
    if (!before.has(path)) created.push(path);
    else if (before.get(path) !== hash) modified.push(path);
  }
  for (const path of before.keys()) if (!after.has(path)) removed.push(path);
  return { created, modified, removed };
};

export const inspectPackage = async (packageArgument, { repoRoot = PROJECT_ROOT } = {}) => {
  const errors = [];
  const warnings = [];
  const conflicts = [];
  const packageRoot = resolve(packageArgument);
  const result = {
    packageRoot,
    manifest: null,
    contentSource: null,
    contentDestination: null,
    assetPlans: [],
    filesToCreate: [],
    hashes: {},
    rewrites: [],
    renderedContent: null,
    errors,
    warnings,
    conflicts
  };

  let packageInfo;
  try {
    packageInfo = await lstat(packageRoot);
  } catch {
    errors.push(`Pasta de pacote inexistente: ${packageRoot}`);
    return result;
  }
  if (!packageInfo.isDirectory() || packageInfo.isSymbolicLink()) {
    errors.push("O argumento deve apontar para uma pasta real, nunca para link simbólico.");
    return result;
  }

  const realPackageRoot = await realpath(packageRoot);
  result.packageRoot = realPackageRoot;
  if (pathWithin(realPackageRoot, repoRoot) && !pathWithin(realPackageRoot, repoPath(repoRoot, INPUT_ROOT_NAME))) {
    errors.push(`Pacotes dentro do repositório devem permanecer exclusivamente em ${INPUT_ROOT_NAME}/, que não é versionada.`);
  }

  let files;
  try {
    files = await walk(realPackageRoot);
  } catch (error) {
    errors.push(error.message);
    return result;
  }
  if (files.length > MAX_PACKAGE_FILES) errors.push(`Pacote excede o limite de ${MAX_PACKAGE_FILES} arquivos.`);
  const packageBytes = files.reduce((total, file) => total + file.size, 0);
  if (packageBytes > MAX_PACKAGE_BYTES) errors.push(`Pacote excede o limite de ${MAX_PACKAGE_BYTES} bytes.`);
  for (const file of files) {
    const extension = extname(file.relativePath).toLowerCase();
    if (EXECUTABLE_EXTENSIONS.includes(extension)) errors.push(`Script ou executável proibido no pacote: ${file.relativePath}`);
    if (file.relativePath.split("/").some((segment) => !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment))) {
      errors.push(`Nome de arquivo inseguro no pacote: ${file.relativePath}`);
    }
  }

  const manifestPath = join(realPackageRoot, "manifest.json");
  const manifestEntry = files.find((file) => file.path.toLowerCase() === manifestPath.toLowerCase());
  if (!manifestEntry) {
    errors.push("manifest.json ausente na raiz do pacote.");
    return result;
  }
  if (manifestEntry.size > MAX_MANIFEST_BYTES) {
    errors.push(`manifest.json excede ${MAX_MANIFEST_BYTES} bytes.`);
    return result;
  }

  let manifestInput;
  try {
    manifestInput = JSON.parse((await readFile(manifestPath, "utf8")).replace(/^\uFEFF/, ""));
  } catch (error) {
    errors.push(`manifest.json inválido: ${error.message}`);
    return result;
  }
  const manifestCheck = validateManifest(manifestInput);
  errors.push(...manifestCheck.errors);
  warnings.push(...manifestCheck.warnings);
  result.manifest = manifestCheck.manifest ?? manifestInput;
  if (!manifestCheck.manifest) return result;
  const manifest = manifestCheck.manifest;
  errors.push(...await inspectCollectionConfig(repoRoot, manifest.collection));
  const contentEntries = await existingContentSlugs(repoRoot);

  const declaredFiles = new Set(["manifest.json", manifest.contentFile, "NOTAS-DE-IMPORTACAO.md", ...manifest.assets.map((asset) => asset.source)]);
  for (const file of files) {
    if (!declaredFiles.has(file.relativePath)) warnings.push(`Arquivo não declarado será ignorado: ${file.relativePath}`);
  }

  const contentPath = packagePath(realPackageRoot, manifest.contentFile);
  result.contentSource = contentPath;
  if (!pathWithin(contentPath, realPackageRoot)) errors.push("contentFile escaparia da pasta do pacote.");
  const contentEntry = files.find((file) => file.path.toLowerCase() === contentPath.toLowerCase());
  if (!contentEntry) errors.push(`Arquivo de conteúdo não encontrado: ${manifest.contentFile}`);
  else if (contentEntry.size > MAX_CONTENT_BYTES) errors.push(`Arquivo de conteúdo excede ${MAX_CONTENT_BYTES} bytes.`);

  let parsed;
  if (contentEntry) {
    const source = await readFile(contentPath, "utf8");
    result.hashes[manifest.contentFile] = sha256(Buffer.from(source, "utf8"));
    parsed = parseContentDocument(source, manifest.contentFile);
    errors.push(...parsed.errors);
    const extension = extname(manifest.contentFile).toLowerCase();
    errors.push(...validateContentSecurity(parsed.body, extension));
    errors.push(...validatePortalReferences(parsed.body, contentEntries, manifest));
    const resolved = resolveFrontmatter(manifest, parsed.frontmatter);
    errors.push(...resolved.errors);
    warnings.push(...resolved.warnings);
    errors.push(...inspectTaxonomy(manifest, resolved.frontmatter));

    const references = extractAssetReferences(parsed.body);
    const declared = new Set(manifest.assets.map((asset) => asset.source));
    for (const reference of references) {
      const classification = classifyAssetReference(reference);
      if (classification.kind === "unsafe") errors.push(`Referência de asset insegura: ${reference}. ${classification.reason}`);
      if (classification.kind === "package" && !declared.has(classification.path)) {
        errors.push(`Asset local referenciado, mas não declarado no manifesto: ${classification.path}`);
      }
      if (classification.kind === "remote") warnings.push(`Referência remota preservada: ${reference}`);
    }
    for (const asset of manifest.assets) {
      if (!references.includes(asset.source)) warnings.push(`Asset declarado, mas não referenciado no documento: ${asset.source}`);
    }
    const rewritten = rewriteAssetReferences(parsed.body, manifest);
    result.rewrites = rewritten.rewrites;
    result.renderedContent = renderContentDocument(resolved.frontmatter, rewritten.body);
  }

  const extension = extname(manifest.contentFile).toLowerCase();
  const destination = repoPath(repoRoot, "src", "content", manifest.collection, `${manifest.slug}${extension}`);
  result.contentDestination = destination;
  result.filesToCreate.push(rel(repoRoot, destination));
  if (!pathWithin(destination, repoPath(repoRoot, "src", "content", manifest.collection))) {
    errors.push("Destino de conteúdo escaparia da coleção escolhida.");
  }
  if (await existing(destination)) conflicts.push(`Arquivo de destino já existe: ${rel(repoRoot, destination)}`);

  for (const entry of contentEntries) {
    if (String(entry.slug).toLowerCase() === manifest.slug.toLowerCase()) {
      conflicts.push(`Slug já existente em ${rel(repoRoot, entry.path)}: ${manifest.slug}`);
    }
  }

  const assetRoot = repoPath(repoRoot, "public", "images", "content", manifest.slug);
  if (manifest.assets.length && await existing(assetRoot)) conflicts.push(`Pasta de assets já existe: ${rel(repoRoot, assetRoot)}`);
  for (const [index, asset] of manifest.assets.entries()) {
    const source = packagePath(realPackageRoot, asset.source);
    const target = packagePath(assetRoot, asset.target);
    const plan = { ...asset, sourcePath: source, destinationPath: target, size: null, hash: null };
    result.assetPlans.push(plan);
    result.filesToCreate.push(rel(repoRoot, target));
    if (!pathWithin(source, realPackageRoot)) errors.push(`Asset escaparia do pacote: ${asset.source}`);
    if (!pathWithin(target, assetRoot)) errors.push(`Destino de asset escaparia de ${rel(repoRoot, assetRoot)}: ${asset.target}`);
    if (await existing(target)) conflicts.push(`Asset de destino já existe: ${rel(repoRoot, target)}`);
    const entry = files.find((file) => file.path.toLowerCase() === source.toLowerCase());
    if (!entry) {
      errors.push(`Asset declarado não encontrado: ${asset.source}`);
      continue;
    }
    if (entry.size > MAX_ASSET_BYTES) errors.push(`Asset excede ${MAX_ASSET_BYTES} bytes: ${asset.source}`);
    const sourceExtension = extname(asset.source).toLowerCase();
    const targetExtension = extname(asset.target).toLowerCase();
    if (!SAFE_ASSET_EXTENSIONS.includes(sourceExtension)) errors.push(`Extensão de asset não aprovada: ${asset.source}`);
    if (sourceExtension !== targetExtension && !(new Set([sourceExtension, targetExtension]).size === 1)) {
      errors.push(`Asset não pode mudar de extensão durante a importação: ${asset.source} -> ${asset.target}`);
    }
    const buffer = await readFile(source);
    plan.size = buffer.length;
    plan.hash = sha256(buffer);
    result.hashes[asset.source] = plan.hash;
    errors.push(...inspectAssetBytes(buffer, sourceExtension, asset.source));
    if (hasLocalMachineReference(buffer.toString("latin1"))) errors.push(`Asset contém referência para caminho local: ${asset.source}`);
  }

  result.errors = unique(errors);
  result.warnings = unique(warnings);
  result.conflicts = unique(conflicts);
  return result;
};

const printList = (label, values, empty = "nenhum") => {
  console.log(`${label}:`);
  if (!values.length) console.log(`  - ${empty}`);
  else for (const value of values) console.log(`  - ${value}`);
};

export const printPlan = (plan, { apply = false } = {}) => {
  const manifest = plan.manifest ?? {};
  console.log(`\nImportação de conteúdo — ${apply ? "APLICAÇÃO" : "DRY-RUN"}`);
  console.log(`Pacote: ${plan.packageRoot}`);
  console.log(`Coleção: ${manifest.collection ?? "indisponível"}`);
  console.log(`Origem: ${plan.contentSource ?? manifest.contentFile ?? "indisponível"}`);
  console.log(`Destino: ${plan.contentDestination ?? "indisponível"}`);
  console.log(`Slug: ${manifest.slug ?? "indisponível"}`);
  console.log(`Status: ${manifest.status ?? "indisponível"}`);
  console.log(`Visibilidade: ${manifest.visibility ?? "indisponível"}`);
  printList("Assets", plan.assetPlans.map((asset) => `${asset.source} -> ${asset.destinationPath}`));
  printList("Referências reescritas", plan.rewrites.map((rewrite) => `${rewrite.from} -> ${rewrite.to}`));
  printList("Conflitos", plan.conflicts);
  printList("Avisos", plan.warnings);
  printList("Erros", plan.errors);
  printList("Arquivos que seriam criados", plan.filesToCreate);
};

const runCommand = async (scriptName, cwd = PROJECT_ROOT) => {
  const npmCli = process.env.npm_execpath;
  const args = npmCli ? [npmCli, "run", scriptName] : ["run", scriptName];
  const command = npmCli ? process.execPath : (process.platform === "win32" ? "pnpm.cmd" : "pnpm");
  const startedAt = new Date().toISOString();
  const exitCode = await new Promise((resolveCode, reject) => {
    const child = spawn(command, args, { cwd, stdio: "inherit", shell: false, windowsHide: true });
    child.once("error", reject);
    child.once("exit", (code, signal) => resolveCode(code ?? (signal ? 1 : 0)));
  });
  const result = { command: `pnpm run ${scriptName}`, startedAt, finishedAt: new Date().toISOString(), exitCode };
  if (exitCode !== 0) throw Object.assign(new Error(`${result.command} falhou com código ${exitCode}.`), { validationResult: result });
  return result;
};

const restoreDownloads = async (downloadsPath, backupPath, existedBefore) => {
  if (await existing(downloadsPath)) await rm(downloadsPath, { recursive: true, force: true });
  if (existedBefore) await cp(backupPath, downloadsPath, { recursive: true, force: false, errorOnExist: true });
};

const rollbackCreated = async (created, assetRoot) => {
  for (const path of [...created].reverse()) if (await existing(path)) await rm(path, { force: true });
  if (assetRoot && await existing(assetRoot)) await rm(assetRoot, { recursive: true, force: true });
};

export const applyImport = async (initialPlan, { repoRoot = PROJECT_ROOT } = {}) => {
  if (initialPlan.errors.length || initialPlan.conflicts.length) throw new Error("O pacote possui erros ou conflitos; aplicação recusada.");
  const plan = await inspectPackage(initialPlan.packageRoot, { repoRoot });
  if (plan.errors.length || plan.conflicts.length) {
    printPlan(plan, { apply: true });
    throw new Error("O pacote ou o repositório mudou após o dry-run; aplicação recusada.");
  }

  const inputRoot = repoPath(repoRoot, INPUT_ROOT_NAME);
  await mkdir(inputRoot, { recursive: true });
  const lockPath = join(inputRoot, ".content-import.lock");
  let lock;
  try {
    lock = await open(lockPath, "wx");
    await lock.writeFile(JSON.stringify({ pid: process.pid, package: plan.packageRoot, startedAt: new Date().toISOString() }, null, 2));
  } catch (error) {
    if (error.code === "EEXIST") throw new Error(`Outra importação parece estar em andamento: ${lockPath}`);
    throw error;
  }

  const stagingRoot = await mkdtemp(join(tmpdir(), "arborius-content-import-"));
  const backupRoot = join(stagingRoot, "backup");
  const stagedContent = join(stagingRoot, basename(plan.contentDestination));
  const stagedAssets = join(stagingRoot, "assets");
  const downloadsPath = repoPath(repoRoot, "public", "downloads");
  const downloadsBackup = join(backupRoot, "downloads");
  const downloadsExisted = await existing(downloadsPath);
  const downloadsBefore = await snapshotDirectory(downloadsPath, repoRoot);
  let downloadsBackedUp = false;
  const created = [];
  const validationResults = [];
  const assetRoot = plan.assetPlans.length
    ? repoPath(repoRoot, "public", "images", "content", plan.manifest.slug)
    : null;

  try {
    await mkdir(backupRoot, { recursive: true });
    await writeFile(join(backupRoot, "operation.json"), JSON.stringify({
      package: plan.packageRoot,
      contentDestination: plan.contentDestination,
      assetDestinations: plan.assetPlans.map((asset) => asset.destinationPath),
      hashes: plan.hashes
    }, null, 2));
    if (downloadsExisted) {
      await cp(downloadsPath, downloadsBackup, { recursive: true, force: false, errorOnExist: true });
      downloadsBackedUp = true;
    } else {
      downloadsBackedUp = true;
    }

    await writeFile(stagedContent, plan.renderedContent, { encoding: "utf8", flag: "wx" });
    await mkdir(stagedAssets, { recursive: true });
    for (const asset of plan.assetPlans) {
      const staged = join(stagedAssets, asset.target);
      await mkdir(dirname(staged), { recursive: true });
      await copyFile(asset.sourcePath, staged, copyExclusive);
      if (sha256(await readFile(staged)) !== asset.hash) throw new Error(`Hash divergiu durante o staging: ${asset.source}`);
    }

    if (await existing(plan.contentDestination)) throw new Error(`Destino surgiu durante a operação: ${plan.contentDestination}`);
    if (assetRoot && await existing(assetRoot)) throw new Error(`Pasta de assets surgiu durante a operação: ${assetRoot}`);
    await mkdir(dirname(plan.contentDestination), { recursive: true });
    await copyFile(stagedContent, plan.contentDestination, copyExclusive);
    created.push(plan.contentDestination);
    if (assetRoot) {
      await mkdir(dirname(assetRoot), { recursive: true });
      await mkdir(assetRoot, { recursive: false });
    }
    for (const asset of plan.assetPlans) {
      await mkdir(dirname(asset.destinationPath), { recursive: true });
      const staged = join(stagedAssets, asset.target);
      await copyFile(staged, asset.destinationPath, copyExclusive);
      created.push(asset.destinationPath);
    }

    validationResults.push(await runCommand("validate", repoRoot));
    validationResults.push(await runCommand("build", repoRoot));

    const downloadsAfter = await snapshotDirectory(downloadsPath, repoRoot);
    const generatedChanges = diffSnapshots(downloadsBefore, downloadsAfter);
    const timestamp = new Date().toISOString();
    const reportDirectory = join(inputRoot, ".relatorios");
    await mkdir(reportDirectory, { recursive: true });
    const reportPath = join(reportDirectory, `${timestamp.replace(/[:.]/g, "-")}-${plan.manifest.slug}.json`);
    const report = {
      date: timestamp,
      package: plan.packageRoot,
      manifest: {
        collection: plan.manifest.collection,
        slug: plan.manifest.slug,
        status: plan.manifest.status,
        visibility: plan.manifest.visibility
      },
      hashes: plan.hashes,
      filesCreated: created.map((path) => rel(repoRoot, path)),
      assets: plan.assetPlans.map((asset) => ({
        source: asset.source,
        destination: rel(repoRoot, asset.destinationPath),
        sha256: asset.hash,
        bytes: asset.size
      })),
      rewrittenReferences: plan.rewrites,
      generatedChanges,
      warnings: plan.warnings,
      validationCommands: validationResults,
      undo: [
        "Não use git clean ou git reset.",
        "Remova manualmente somente os caminhos listados em filesCreated.",
        "Revise generatedChanges e regenere downloads com pnpm run downloads, se necessário.",
        "Execute novamente pnpm run validate e pnpm run build."
      ]
    };
    await writeFile(reportPath, JSON.stringify(report, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
    console.log(`\nImportação aplicada integralmente.`);
    console.log(`Relatório temporário: ${reportPath}`);
    console.log("Nenhum staging, commit ou push foi executado.");
    return { plan, reportPath, report };
  } catch (error) {
    if (error.validationResult) validationResults.push(error.validationResult);
    await rollbackCreated(created, assetRoot);
    if (downloadsBackedUp) await restoreDownloads(downloadsPath, downloadsBackup, downloadsExisted);
    const failedAt = new Date().toISOString();
    const reportDirectory = join(inputRoot, ".relatorios");
    let failureReportPath;
    try {
      await mkdir(reportDirectory, { recursive: true });
      failureReportPath = join(
        reportDirectory,
        `${failedAt.replace(/[:.]/g, "-")}-${plan.manifest.slug}-falha.json`
      );
      await writeFile(failureReportPath, JSON.stringify({
        date: failedAt,
        status: "revertida",
        package: plan.packageRoot,
        hashes: plan.hashes,
        attemptedFiles: created.map((path) => rel(repoRoot, path)),
        filesCreated: [],
        assets: plan.assetPlans.map((asset) => ({
          source: asset.source,
          destination: rel(repoRoot, asset.destinationPath),
          sha256: asset.hash,
          bytes: asset.size
        })),
        warnings: plan.warnings,
        validationCommands: validationResults,
        error: error.message,
        undo: [
          "A importação foi revertida; nenhum arquivo listado em attemptedFiles deve permanecer.",
          "Revise git status --short e o erro acima antes de tentar novamente."
        ]
      }, null, 2) + "\n", { encoding: "utf8", flag: "wx" });
    } catch (reportError) {
      console.error(`Não foi possível gravar o relatório de falha: ${reportError.message}`);
    }
    const reportNotice = failureReportPath ? ` Relatório: ${failureReportPath}` : "";
    const punctuation = /[.!?]$/.test(error.message) ? "" : ".";
    throw new Error(`Importação revertida integralmente: ${error.message}${punctuation}${reportNotice}`, { cause: error });
  } finally {
    await lock.close().catch(() => {});
    await rm(lockPath, { force: true });
    await rm(stagingRoot, { recursive: true, force: true });
  }
};

const usage = () => {
  console.log('Uso: pnpm content:import "_entrada-conteudo/nome-do-pacote" [--apply]');
  console.log("Sem --apply, o comando é sempre um dry-run e não modifica o repositório.");
};

export const main = async (argv = process.argv.slice(2)) => {
  const apply = argv.includes("--apply");
  const unknownOptions = argv.filter((argument) => argument.startsWith("--") && argument !== "--apply");
  const paths = argv.filter((argument) => !argument.startsWith("--"));
  if (unknownOptions.length || paths.length !== 1) {
    usage();
    if (unknownOptions.length) console.error(`Opções desconhecidas: ${unknownOptions.join(", ")}`);
    process.exitCode = 2;
    return;
  }

  const plan = await inspectPackage(paths[0]);
  printPlan(plan, { apply });
  if (plan.errors.length || plan.conflicts.length) {
    console.error("\nImportação recusada. Corrija todos os erros e conflitos antes de tentar novamente.");
    process.exitCode = 1;
    return;
  }
  if (!apply) {
    console.log("\nDry-run concluído. Nenhum arquivo foi modificado.");
    console.log("Para aplicar exatamente este pacote, revise o plano e execute novamente com --apply.");
    return;
  }
  await applyImport(plan);
};

const invokedPath = process.argv[1] ? resolve(process.argv[1]) : "";
if (invokedPath === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`\nErro: ${error.message}`);
    process.exitCode = 1;
  });
}