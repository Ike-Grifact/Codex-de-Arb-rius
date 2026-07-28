import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  gameSymbolText,
  isGameSymbol
} from "../src/data/game-symbols.mjs";
import {
  originLabel,
  ptBrCollator,
  tagLabel,
  typeLabel
} from "../src/data/taxonomy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = resolve(root, "src/content");
const outputRoot = resolve(root, "public/downloads/markdown");

const unquote = (value = "") => {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
};

const parseFrontmatter = (source, file) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const metadata = {};
  let activeList;

  for (const line of (match?.[1] ?? "").split(/\r?\n/)) {
    const pair = line.match(/^([A-Za-z][\w-]*):\s*(.*)$/);
    if (pair) {
      const [, key, rawValue] = pair;
      if (rawValue.trim()) {
        metadata[key] = unquote(rawValue);
        activeList = undefined;
      } else {
        metadata[key] = [];
        activeList = key;
      }
      continue;
    }

    const item = line.match(/^\s+-\s+(.+)$/);
    if (item && activeList && Array.isArray(metadata[activeList])) {
      metadata[activeList].push(unquote(item[1]));
    }
  }

  return {
    body: match ? source.slice(match[0].length) : source,
    slug: metadata.slug || basename(file, extname(file)),
    title: metadata.title || "Documento",
    type: metadata.type || "conteudo",
    visibility: metadata.visibility || "publico",
    status: metadata.status || "publicado",
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    origin: metadata.origin || metadata.sourceGuide || "",
    updated: metadata.updated || "",
    order: Number(metadata.order || 99),
    category: metadata.category || ""
  };
};

const cleanBody = (body) =>
  body
    .replace(/^import\s+.+?;\s*$/gm, "")
    .replace(/^<[A-Z][A-Za-z0-9]*\b[^>]*\/>\s*$/gm, "")
    .replace(/<!--(?:.|\r?\n)*?-->/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const readableSymbols = (body) =>
  body.replace(/\{\{([a-z0-9-]+)(?::(\d+))?\}\}/g, (token, type, rawCount) => {
    if (!isGameSymbol(type)) return token;
    const count = rawCount === undefined ? undefined : Number(rawCount);
    return gameSymbolText(type, count);
  });

const collectFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    else if ([".md", ".mdx"].includes(extname(entry.name))) files.push(path);
  }
  return files;
};

const yamlString = (value) => JSON.stringify(String(value));
const exportFrontmatter = (document) => {
  const visibleTags = [...new Set(document.tags.map(tagLabel))]
    .sort((left, right) => ptBrCollator.compare(left, right));
  const lines = [
    "---",
    `title: ${yamlString(document.title)}`,
    `slug: ${yamlString(document.slug)}`,
    `type: ${yamlString(typeLabel(document.type))}`,
    "tags:",
    ...visibleTags.map((tag) => `  - ${yamlString(tag)}`)
  ];
  if (document.updated) lines.push(`updated: ${yamlString(document.updated)}`);
  if (document.origin) lines.push(`source: ${yamlString(originLabel(document.origin))}`);
  lines.push("---");
  return lines.join("\n");
};

const files = await collectFiles(contentRoot);
const publicDocuments = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const parsed = parseFrontmatter(source, file);
  if (parsed.visibility !== "publico" || parsed.status === "rascunho") continue;
  publicDocuments.push({
    ...parsed,
    body: cleanBody(parsed.body),
    collection: file.slice(contentRoot.length + 1).split(/[\\/]/)[0]
  });
}

const loreBySlug = new Map(
  publicDocuments
    .filter((entry) => entry.collection === "lore")
    .map((entry) => [entry.slug, entry])
);

const expandLore = (body) =>
  body.replace(/\{\{lore:([a-z0-9-]+)\}\}/g, (token, slug) => {
    const lore = loreBySlug.get(slug);
    if (!lore) throw new Error(`Verbete de lore ausente na exportação: ${slug}`);
    return `## ${lore.order}. ${lore.title}\n\n${lore.body}`;
  });

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const document of publicDocuments) {
  let body = expandLore(document.body);
  if (document.slug === "materiais-assimilados") {
    const embedded = publicDocuments
      .filter((entry) => ["materiais", "itens"].includes(entry.collection))
      .sort((left, right) => ptBrCollator.compare(left.title, right.title))
      .map((entry) => `\n\n---\n\n## ${entry.title}\n\n${entry.body}`)
      .join("");
    body += embedded;
  }

  body = readableSymbols(cleanBody(body));
  if (/\{\{[^}]+\}\}/.test(body)) {
    throw new Error(`Marcação não resolvida na exportação: ${document.slug}`);
  }
  if (!/^#\s+/m.test(body)) body = `# ${document.title}\n\n${body}`;

  const output = `${exportFrontmatter(document)}\n\n${body.trim()}\n`;
  await writeFile(resolve(outputRoot, `${document.slug}.md`), output, "utf8");
}

console.log(`${publicDocuments.length} arquivos Markdown públicos preparados em UTF-8.`);
