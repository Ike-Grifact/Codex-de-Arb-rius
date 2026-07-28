import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = resolve(root, "src/content");
const outputRoot = resolve(root, "public/downloads/markdown");

const parseFrontmatter = (source) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const frontmatter = match?.[1] ?? "";
  const value = (key) =>
    frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\r\\n]+)`, "m"))?.[1]?.trim();
  return {
    body: match ? source.slice(match[0].length) : source,
    slug: value("slug") || basename("document"),
    title: value("title") || "Documento",
    visibility: value("visibility") || "publico",
    status: value("status") || "publicado"
  };
};

const cleanBody = (body) =>
  body
    .replace(/^import\s+.+?;\s*$/gm, "")
    .replace(/^<MaterialsGuideSections\s*\/>\s*$/gm, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

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

const files = await collectFiles(contentRoot);
const publicDocuments = [];

for (const file of files) {
  const source = await readFile(file, "utf8");
  const parsed = parseFrontmatter(source);
  if (
    parsed.visibility !== "publico" ||
    parsed.status === "rascunho"
  ) {
    continue;
  }
  publicDocuments.push({
    ...parsed,
    body: cleanBody(parsed.body),
    collection: file.slice(contentRoot.length + 1).split(/[\\/]/)[0]
  });
}

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const document of publicDocuments) {
  let body = document.body;
  if (document.slug === "materiais-assimilados") {
    const embedded = publicDocuments
      .filter((entry) => ["materiais", "itens"].includes(entry.collection))
      .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"))
      .map((entry) => `\n\n---\n\n## ${entry.title}\n\n${entry.body}`)
      .join("");
    body += embedded;
  }

  const header = `# ${document.title}\n\n`;
  await writeFile(
    resolve(outputRoot, `${document.slug}.md`),
    `${header}${body.trim()}\n`,
    "utf8"
  );
}

console.log(`${publicDocuments.length} arquivos Markdown públicos preparados.`);
