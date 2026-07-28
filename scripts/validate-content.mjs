import { access, readFile, readdir } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const requiredSymbols = [
  "sucesso.svg",
  "adaptacao.svg",
  "pressao.svg",
  "niveldedeterminacao.svg",
  "pontodedeterminacao.svg",
  "niveldeassimilacao.svg",
  "pontodeassimilacao.svg",
  "niveldesaude.svg",
  "pontodesaude.svg",
  "d6.svg",
  "d10.svg",
  "d12.svg"
];

for (const symbol of requiredSymbols) {
  await access(resolve(root, "public/symbols", symbol));
}

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const output = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      output.push(...(await walk(path)));
    } else {
      output.push(path);
    }
  }

  return output;
};

const contentFiles = (
  await walk(resolve(root, "src/content"))
).filter((file) => [".md", ".mdx"].includes(extname(file)));

const publicSlugs = new Set();

for (const file of contentFiles) {
  const source = await readFile(file, "utf8");

  const slug = source
    .match(/^slug:\s*["']?([^"'\r\n]+)/m)?.[1]
    ?.trim();

  const visibility =
    source
      .match(/^visibility:\s*["']?([^"'\r\n]+)/m)?.[1]
      ?.trim() || "publico";

  const status =
    source
      .match(/^status:\s*["']?([^"'\r\n]+)/m)?.[1]
      ?.trim() || "publicado";

  if (!slug) {
    throw new Error(`Metadado slug ausente em ${file}`);
  }

  if (visibility === "publico" && status === "publicado") {
    if (publicSlugs.has(slug)) {
      throw new Error(`Slug público duplicado: ${slug}`);
    }

    publicSlugs.add(slug);
  }
}

const lucker = await readFile(
  resolve(root, "src/content/guias/guia-lucker.md"),
  "utf8"
);

if (
  !/^visibility:\s*["']reservado["']/m.test(lucker) ||
  !/^status:\s*["']rascunho["']/m.test(lucker)
) {
  throw new Error(
    "O Guia Lucker deve permanecer reservado e em rascunho."
  );
}

const publicDirectory = resolve(root, "public");
const publicFiles = await walk(publicDirectory);

const forbiddenNames =
  /(?:03_SRD|SRD_Assimilacao|balanceamento|notas[_-]?internas)/i;

const leaked = publicFiles.filter((file) =>
  forbiddenNames.test(file)
);

if (leaked.length) {
  throw new Error(
    `Arquivo reservado encontrado em public: ${leaked.join(", ")}`
  );
}

console.log(
  `Conteúdo válido: ${contentFiles.length} fontes, ` +
    `${publicSlugs.size} slugs públicos e nenhum reservado em public.`
);
