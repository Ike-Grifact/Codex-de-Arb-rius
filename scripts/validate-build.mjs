import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, posix, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { symbols } from "../src/data/game-symbols.mjs";

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
  if (/\{\{[^}]+\}\}/.test(html)) {
    errors.push(`${file}: marcação semântica não compilada`);
  }

  const symbolSources = [...html.matchAll(/<img[^>]+src=["']([^"']*\/symbols\/[^"']+)["'][^>]*>/g)]
    .map((match) => match[1]);
  for (const source of symbolSources) {
    if (!source.startsWith(`${configuredBase}symbols/`)) {
      errors.push(`${relative(dist, file)}: símbolo sem base configurada ${source}`);
    }
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

for (const symbol of Object.values(symbols)) {
  if (!relativeFiles.has(`symbols/${symbol.file}`)) {
    errors.push(`Símbolo mapeado ausente no build: ${symbol.file}`);
  }
}

const markdownFiles = files.filter((file) => extname(file) === ".md");
for (const file of markdownFiles) {
  const markdown = await readFile(file, "utf8");
  if (!/^---\r?\n[\s\S]+?\r?\n---\r?\n/.test(markdown)) {
    errors.push(`${relative(dist, file)}: frontmatter Markdown ausente ou inválido`);
  }
  if (/\{\{[^}]+\}\}/.test(markdown)) {
    errors.push(`${relative(dist, file)}: token de símbolo não convertido`);
  }
  if (/^import\s|<[A-Z][A-Za-z0-9]*\b/m.test(markdown)) {
    errors.push(`${relative(dist, file)}: componente de interface na exportação Markdown`);
  }
}

if (relativeFiles.has("biblioteca/guia-lucker/index.html")) {
  errors.push("O Guia Lucker gerou uma rota pública.");
}

if (errors.length) throw new Error(errors.join("\n"));
console.log(
  `Build validado: ${htmlFiles.length} páginas, ${markdownFiles.length} Markdown e símbolos com BASE_URL íntegros.`
);