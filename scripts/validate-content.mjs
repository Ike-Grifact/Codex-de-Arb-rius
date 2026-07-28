import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isGameSymbol, symbols } from "../src/data/game-symbols.mjs";
import {
  availabilityLabels,
  categoryLabels,
  originLabels,
  tagLabels
} from "../src/data/taxonomy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

for (const symbol of Object.values(symbols)) {
  await access(resolve(root, "public/symbols", symbol.file));
}

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

const parseMetadata = (source) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const metadata = {};
  let activeList;
  for (const line of (match?.[1] ?? "").split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z][\w-]*):\s*["']?([^"'\r\n]*)/);
    if (pair) {
      const [, key, value] = pair;
      if (value.trim()) {
        metadata[key] = value.trim();
        activeList = undefined;
      } else {
        metadata[key] = [];
        activeList = key;
      }
      continue;
    }
    const item = line.match(/^\s+-\s+["']?([^"'\r\n]+)/);
    if (item && activeList && Array.isArray(metadata[activeList])) {
      metadata[activeList].push(item[1].trim());
    }
  }
  return metadata;
};

const contentFiles = (await walk(resolve(root, "src/content")))
  .filter((file) => [".md", ".mdx"].includes(extname(file)));
const publicSlugs = new Set();
const loreSlugs = new Set();
const loreIncludes = [];

for (const file of contentFiles) {
  const source = await readFile(file, "utf8");
  const metadata = parseMetadata(source);
  const slug = metadata.slug;
  const visibility = metadata.visibility || "publico";
  const status = metadata.status || "publicado";

  if (!slug) throw new Error(`Metadado slug ausente em ${file}`);
  if (file.includes(join("content", "lore"))) loreSlugs.add(slug);

  if (visibility === "publico" && status === "publicado") {
    if (publicSlugs.has(slug)) throw new Error(`Slug público duplicado: ${slug}`);
    publicSlugs.add(slug);
  }

  for (const tag of metadata.tags || []) {
    if (!tagLabels[tag]) throw new Error(`Tag sem taxonomia: ${tag} em ${file}`);
  }

  const category = metadata.category;
  if (category && !/^\d+$/.test(category) && !categoryLabels[category]) {
    throw new Error(`Categoria sem taxonomia: ${category} em ${file}`);
  }
  if (metadata.availability && !availabilityLabels[metadata.availability]) {
    throw new Error(`Disponibilidade sem taxonomia: ${metadata.availability} em ${file}`);
  }
  const origin = metadata.origin || metadata.sourceGuide;
  if (origin && !originLabels[origin]) {
    throw new Error(`Origem sem taxonomia: ${origin} em ${file}`);
  }

  for (const token of source.matchAll(/\{\{([^}:]+)(?::([^}]+))?\}\}/g)) {
    const [, type, value] = token;
    if (type === "lore") {
      loreIncludes.push({ slug: value, file });
      continue;
    }
    if (!isGameSymbol(type)) {
      throw new Error(`Símbolo desconhecido {{${type}}} em ${file}`);
    }
    if (value !== undefined && (!/^\d+$/.test(value) || Number(value) < 1)) {
      throw new Error(`Quantidade inválida em {{${type}:${value}}} em ${file}`);
    }
  }
}

for (const include of loreIncludes) {
  if (!loreSlugs.has(include.slug)) {
    throw new Error(`Include de lore desconhecido: ${include.slug} em ${include.file}`);
  }
}

const lucker = await readFile(resolve(root, "src/content/guias/guia-lucker.md"), "utf8");
if (
  !/^visibility:\s*["']reservado["']/m.test(lucker) ||
  !/^status:\s*["']rascunho["']/m.test(lucker)
) {
  throw new Error("O Guia Lucker deve permanecer reservado e em rascunho.");
}

const sourceFiles = (await walk(resolve(root, "src")))
  .filter((file) => [".astro", ".ts", ".mjs", ".md", ".mdx"].includes(extname(file)));
for (const file of sourceFiles) {
  const source = await readFile(file, "utf8");
  if (/["'(]\/symbols\//.test(source)) {
    throw new Error(`Caminho de símbolo sem BASE_URL em ${file}`);
  }
}

const publicDirectory = resolve(root, "public");
const publicFiles = await walk(publicDirectory);
const forbiddenNames = /(?:03_SRD|SRD_Assimilacao|balanceamento|notas[_-]?internas)/i;
const leaked = publicFiles.filter((file) => forbiddenNames.test(file));
if (leaked.length) {
  throw new Error(`Arquivo reservado encontrado em public: ${leaked.join(", ")}`);
}

console.log(
  `Conteúdo válido: ${contentFiles.length} fontes, ` +
  `${publicSlugs.size} slugs públicos, ${Object.keys(symbols).length} símbolos mapeados ` +
  "e taxonomia completa."
);
