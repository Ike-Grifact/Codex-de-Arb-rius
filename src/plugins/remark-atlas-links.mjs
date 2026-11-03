import { readFile, readdir } from "node:fs/promises";
import { resolve, join } from "node:path";
import { fileURLToPath } from "node:url";

// Referências de personagens ficam em texto até que sua biografia pública exista.
const atlasRoot = resolve(fileURLToPath(new URL("../content/atlas/", import.meta.url)));
const atlasPattern = /^atlas:([a-z0-9-]+)$/;

const withBase = (path, base) => {
  const prefix = base.endsWith("/") ? base : base + "/";
  return prefix + path.replace(/^\/+/, "");
};

const frontmatterValue = (source, key) => {
  const frontmatter = source.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  if (!frontmatter) return "";
  const line = frontmatter[1].split(/\r?\n/).find(line => line.startsWith(key + ":"));
  return line?.slice(key.length + 1).trim().replace(/^["']|["']$/g, "") ?? "";
};

async function publicAtlasSlugs() {
  const files = await readdir(atlasRoot, { withFileTypes: true });
  const published = new Set();
  await Promise.all(files.filter(file => file.isFile() && file.name.endsWith(".md")).map(async file => {
    const source = await readFile(join(atlasRoot, file.name), "utf8");
    if (frontmatterValue(source, "visibility") === "publico" &&
        frontmatterValue(source, "status") === "publicado") {
      const slug = frontmatterValue(source, "slug");
      if (slug) published.add(slug);
    }
  }));
  return published;
}

export default function remarkAtlasLinks({ base = "/" } = {}) {
  return async (tree) => {
    const published = await publicAtlasSlugs();

    const visit = (node) => {
      if (!Array.isArray(node.children)) return;
      node.children = node.children.flatMap(child => {
        const slug = child.type === "link" ? child.url?.match(atlasPattern)?.[1] : null;
        if (slug) {
          if (published.has(slug)) {
            child.url = withBase("personagens/" + slug + "/", base);
            return [child];
          }
          // Não cria destinos inexistentes para biografias futuras.
          return child.children ?? [{ type: "text", value: slug }];
        }
        visit(child);
        return [child];
      });
    };

    visit(tree);
  };
}
