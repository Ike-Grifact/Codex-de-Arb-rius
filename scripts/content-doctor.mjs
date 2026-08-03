import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { COLLECTIONS, COLLECTION_SPECS } from "./content-package-schema.mjs";
import { PROJECT_ROOT, inspectPackage } from "./content-import.mjs";

const checks = [];
const record = (ok, message) => checks.push({ ok, message });

const checkRepository = async () => {
  const packageJson = JSON.parse(await readFile(join(PROJECT_ROOT, "package.json"), "utf8"));
  record(
    packageJson.scripts?.["content:import"] === "node scripts/content-import.mjs",
    "package.json expõe content:import"
  );
  record(
    packageJson.scripts?.["content:doctor"] === "node scripts/content-doctor.mjs",
    "package.json expõe content:doctor"
  );
  record(
    packageJson.devDependencies?.["js-yaml"] === "4.3.0",
    "js-yaml é dependência direta e fixada"
  );

  const gitignore = await readFile(join(PROJECT_ROOT, ".gitignore"), "utf8");
  record(
    gitignore.split(/\r?\n/).includes("_entrada-conteudo/"),
    "_entrada-conteudo/ está ignorada pelo Git"
  );

  const config = await readFile(join(PROJECT_ROOT, "src", "content.config.ts"), "utf8");
  const exported = config.match(/export const collections\s*=\s*\{([\s\S]*?)\};/)?.[1] ?? "";
  for (const collection of COLLECTIONS) {
    record(
      new RegExp(`\\b${collection}\\b`).test(exported),
      `coleção ${collection} continua exportada por src/content.config.ts`
    );
  }
  record(
    /z\.enum\(\["publico",\s*"reservado",\s*"oculto"\]\)/.test(config),
    "enum de visibilidade conhecido permanece compatível"
  );
  record(
    /z\.enum\(\["publicado",\s*"rascunho"\]\)/.test(config),
    "enum de status conhecido permanece compatível"
  );

  for (const [collection, spec] of Object.entries(COLLECTION_SPECS)) {
    const declaration = config.match(new RegExp(`const ${collection} = defineCollection\\(\\{([\\s\\S]*?)\\n\\}\\);`))?.[1] ?? "";
    const expectedPattern = spec.extensions.includes(".mdx") ? "**/*.{md,mdx}" : "**/*.md";
    record(
      declaration.includes(`pattern: "${expectedPattern}"`) && declaration.includes(`base: "./src/content/${collection}"`),
      `${collection} aceita as extensões declaradas pelo importador`
    );
  }

  const astroConfig = await readFile(join(PROJECT_ROOT, "astro.config.mjs"), "utf8");
  record(
    astroConfig.includes("remark-content-assets.mjs") && astroConfig.includes("remarkContentAssets"),
    "assets importados recebem BASE_URL durante a renderização"
  );
};

const writePackage = async (root, manifest, body = "# Documento de teste\n") => {
  await mkdir(join(root, "content"), { recursive: true });
  await mkdir(join(root, "assets"), { recursive: true });
  await writeFile(join(root, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n", "utf8");
  await writeFile(join(root, "content", "documento.md"), body, "utf8");
};

const baseManifest = (slug) => ({
  schemaVersion: 1,
  collection: "guias",
  title: "Documento temporário de validação",
  slug,
  status: "rascunho",
  visibility: "publico",
  tags: ["homebrew"],
  related: [],
  source: "homebrew-arborius",
  contentFile: "content/documento.md",
  assets: [],
  frontmatter: {
    description: "Pacote efêmero usado exclusivamente pelo autoteste do importador.",
    updated: "2026-08-03"
  }
});

const runSelfTest = async () => {
  const root = await mkdtemp(join(tmpdir(), "arborius-content-doctor-"));
  try {
    const uniqueSuffix = `${process.pid}-${Date.now()}`;
    const validRoot = join(root, "pacote-valido");
    const validManifest = baseManifest(`teste-importacao-${uniqueSuffix}`);
    validManifest.assets = [{ source: "assets/pixel.png", target: "pixel.png" }];
    await writePackage(validRoot, validManifest, "# Documento de teste\\n\\n![Pixel](assets/pixel.png)\\n");
    const pixel = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=", "base64");
    await writeFile(join(validRoot, "assets", "pixel.png"), pixel);
    const valid = await inspectPackage(validRoot);
    record(
      valid.errors.length === 0 && valid.conflicts.length === 0 && valid.rewrites.length === 1 && valid.assetPlans[0]?.hash,
      "autoteste: pacote público válido com asset produz dry-run e reescrita sem erros"
    );

    const collectionCases = {
      materiais: {
        source: "homebrew-arborius",
        frontmatter: { description: "Teste de material.", category: 1, availability: "inicial", updated: "2026-08-03" }
      },
      itens: {
        source: "homebrew-arborius",
        frontmatter: { description: "Teste de item.", category: "ferramenta", availability: "inicial", updated: "2026-08-03" }
      },
      lore: {
        source: "guia-arboriano",
        frontmatter: { description: "Teste de lore.", type: "local", category: "local", updated: "2026-08-03" }
      },
      quests: {
        source: "homebrew-arborius",
        frontmatter: { description: "Teste de quest.", type: "quest", state: "disponivel", updated: "2026-08-03" }
      },
      sessoes: {
        source: "homebrew-arborius",
        frontmatter: { description: "Teste de sessão.", type: "sessao", number: 999, date: "2026-08-03", updated: "2026-08-03" }
      },
      bestiario: {
        source: "homebrew-arborius",
        frontmatter: { description: "Teste de bestiário.", type: "criatura", updated: "2026-08-03" }
      }
    };
    for (const [collection, values] of Object.entries(collectionCases)) {
      const collectionRoot = join(root, `pacote-${collection}`);
      const collectionManifest = baseManifest(`teste-${collection}-${uniqueSuffix}`);
      collectionManifest.collection = collection;
      collectionManifest.source = values.source;
      collectionManifest.frontmatter = values.frontmatter;
      await writePackage(collectionRoot, collectionManifest);
      const collectionPlan = await inspectPackage(collectionRoot);
      record(
        collectionPlan.errors.length === 0 && collectionPlan.conflicts.length === 0,
        `autoteste: coleção ${collection} aceita pacote compatível`
      );
    }
    const invalidRoot = join(root, "pacote-invalido");
    const invalidManifest = baseManifest(`teste-invalido-${uniqueSuffix}`);
    invalidManifest.contentFile = "../segredo.md";
    await writePackage(invalidRoot, invalidManifest);
    const invalid = await inspectPackage(invalidRoot);
    record(invalid.errors.some((error) => error.includes("..")), "autoteste: caminho com .. é recusado");

    const semanticRoot = join(root, "pacote-markdown-invalido");
    const semanticManifest = baseManifest(`teste-markdown-invalido-${uniqueSuffix}`);
    await writePackage(semanticRoot, semanticManifest, "# Inválido\n\n{{simbolo-inexistente}}\n");
    const semantic = await inspectPackage(semanticRoot);
    record(
      semantic.errors.some((error) => error.includes("Símbolo de jogo desconhecido")),
      "autoteste: Markdown semanticamente incompatível é recusado no dry-run"
    );
    const reservedRoot = join(root, "pacote-reservado");
    const reservedManifest = baseManifest(`teste-reservado-${uniqueSuffix}`);
    reservedManifest.visibility = "reservado";
    await writePackage(reservedRoot, reservedManifest);
    const reserved = await inspectPackage(reservedRoot);
    record(
      reserved.errors.some((error) => error.includes("repositório público") && error.includes("fora")),
      "autoteste: conteúdo reservado é recusado com orientação explícita"
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
};

const main = async () => {
  const args = process.argv.slice(2).filter((argument) => argument !== "--");
  const selfTest = args.includes("--self-test");
  const packagePaths = args.filter((argument) => argument !== "--self-test");
  await checkRepository();

  for (const packagePath of packagePaths) {
    const plan = await inspectPackage(resolve(packagePath));
    record(
      plan.errors.length === 0 && plan.conflicts.length === 0,
      `pacote ${packagePath}: ${plan.errors.length} erro(s), ${plan.conflicts.length} conflito(s)`
    );
  }
  if (selfTest) await runSelfTest();

  for (const check of checks) console.log(`${check.ok ? "OK" : "FALHA"}  ${check.message}`);
  const failures = checks.filter((check) => !check.ok);
  console.log(`\nContent doctor: ${checks.length - failures.length}/${checks.length} verificações aprovadas.`);
  if (failures.length) process.exitCode = 1;
};

if (resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(`Content doctor falhou: ${error.message}`);
    process.exitCode = 1;
  });
}