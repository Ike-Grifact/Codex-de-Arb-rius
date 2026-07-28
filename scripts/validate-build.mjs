import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
await access(dist);

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const output = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) output.push(...(await walk(path)));
    else output.push(path);
  }
  return output;
};

const files = await walk(dist);
const relativeFiles = new Set(
  files.map((file) => relative(dist, file).replaceAll("\\", "/"))
);
const htmlFiles = files.filter((file) => extname(file) === ".html");
const htmlCache = new Map();
const errors = [];
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const inferredBase =
  process.env.GITHUB_ACTIONS === "true" && repository && !repository.endsWith(".github.io")
    ? `/${repository}/`
    : "/";
const configuredBase = (process.env.PUBLIC_BASE || inferredBase).replace(/\/?$/, "/");

const resolveTarget = (sourceFile, rawValue) => {
  const value = rawValue.split("?")[0];
  const [pathPart, hash = ""] = value.split("#");
  if (!pathPart && hash) return { file: relative(dist, sourceFile).replaceAll("\\", "/"), hash };

  let normalized;
  if (pathPart.startsWith(configuredBase)) {
    normalized = pathPart.slice(configuredBase.length);
  } else if (pathPart.startsWith("/")) {
    normalized = pathPart.slice(1);
  } else {
    const sourceRelative = relative(dist, sourceFile).replaceAll("\\", "/");
    normalized = posix.normalize(posix.join(posix.dirname(`/${sourceRelative}`), pathPart)).slice(1);
  }

  normalized = decodeURI(normalized).replace(/^\.\//, "");
  if (!normalized) normalized = "index.html";
  if (normalized.endsWith("/")) normalized += "index.html";
  else if (!posix.extname(normalized)) normalized += "/index.html";
  return { file: normalized, hash };
};

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  htmlCache.set(relative(dist, file).replaceAll("\\", "/"), html);
  const ids = [...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    errors.push(`${file}: IDs duplicados (${[...new Set(duplicates)].join(", ")})`);
  }
  if (/C:\\|F:\\|file:\/\//i.test(html)) {
    errors.push(`${file}: caminho local absoluto encontrado`);
  }

  const links = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const link of links) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(link) || link === "#") continue;
    const target = resolveTarget(file, link);
    if (!relativeFiles.has(target.file)) {
      errors.push(`${relative(dist, file)}: link quebrado ${link} -> ${target.file}`);
      continue;
    }
    if (target.hash && extname(target.file) === ".html") {
      const targetHtml = htmlCache.get(target.file) ?? await readFile(resolve(dist, target.file), "utf8");
      if (!new RegExp(`\\sid=["']${target.hash.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`).test(targetHtml)) {
        errors.push(`${relative(dist, file)}: âncora ausente ${link}`);
      }
    }
  }
}

const combined = (
  await Promise.all(
    files
      .filter((file) => [".html", ".js", ".json"].includes(extname(file)))
      .map((file) => readFile(file, "utf8"))
  )
).join("\n");

for (const forbidden of [
  "03_SRD_Interno_Arborius",
  "SRD_Assimilacao_Codex_Arborius",
  "Edição Final Consolidada v3 - Codex de Árborius"
]) {
  if (combined.includes(forbidden)) {
    errors.push(`Conteúdo reservado exposto no build: ${forbidden}`);
  }
}

if (relativeFiles.has("biblioteca/guia-lucker/index.html")) {
  errors.push("O Guia Lucker gerou uma rota pública.");
}

if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `Build validado: ${htmlFiles.length} páginas, links internos íntegros, sem IDs duplicados, caminhos locais ou conteúdo reservado.`
);