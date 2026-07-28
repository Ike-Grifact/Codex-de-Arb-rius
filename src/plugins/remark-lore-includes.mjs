import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const loreRoot = resolve(
  fileURLToPath(new URL("../content/lore/", import.meta.url))
);
const tokenPattern = /^\{\{lore:([a-z0-9-]+)\}\}$/;

const parseLore = (source, slug) => {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Frontmatter ausente no verbete de lore: ${slug}`);
  const frontmatter = match[1];
  const title = frontmatter.match(/^title:\s*["']?([^"'\r\n]+)/m)?.[1]?.trim();
  const order = Number(frontmatter.match(/^order:\s*(\d+)/m)?.[1] ?? 99);
  if (!title) throw new Error(`Título ausente no verbete de lore: ${slug}`);
  return {
    title,
    order,
    body: source.slice(match[0].length).trim()
  };
};

export default function remarkLoreIncludes() {
  const processor = this;

  return async (tree) => {
    const transform = async (parent) => {
      if (!Array.isArray(parent.children)) return;

      for (let index = 0; index < parent.children.length; index += 1) {
        const child = parent.children[index];
        const text =
          child.type === "paragraph" &&
          child.children?.length === 1 &&
          child.children[0]?.type === "text"
            ? child.children[0].value
            : "";
        const token = text.match(tokenPattern);

        if (!token) {
          await transform(child);
          continue;
        }

        const slug = token[1];
        const source = await readFile(resolve(loreRoot, `${slug}.md`), "utf8");
        const lore = parseLore(source, slug);
        const parsed = processor.parse(lore.body);
        const heading = {
          type: "heading",
          depth: 2,
          children: [{ type: "text", value: `${lore.order}. ${lore.title}` }]
        };
        parent.children.splice(index, 1, heading, ...parsed.children);
        index += parsed.children.length;
      }
    };

    await transform(tree);
  };
}
