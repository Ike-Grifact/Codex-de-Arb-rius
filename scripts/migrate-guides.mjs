import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = resolve(projectRoot, "..");
const outputRoot = resolve(projectRoot, "src/content/guias");

const migrations = [
  {
    html: "02_Guia_Jogador_Arboriano.html",
    markdown: "fontes/Guia_do_Jogador_Linhagem_Arboriana_Temporada_1.md",
    output: "guia-arboriano.md",
    frontmatter: `---
title: "Guia do Jogador — Linhagem Arboriana"
slug: "guia-arboriano"
description: "Criação do Desafortunado e do Campeiro, manifestação inicial opcional, regras e gameplay."
type: "guia"
status: "publicado"
visibility: "publico"
order: 1
tags:
  - arborius
  - desafortunados
  - campeiros
updated: 2026-07-27
version: "Temporada 1"
origin: "02_Guia_Jogador_Arboriano.html"
exports:
  pdf: true
  markdown: true
  html: false
---`
  },
  {
    html: "01_Guia_Jogador_Lucker.html",
    markdown: "fontes/Guia_do_Jogador_Lucker_Edicao_Final_v3.md",
    output: "guia-lucker.md",
    frontmatter: `---
title: "Guia do Jogador — Linhagem Lucker"
slug: "guia-lucker"
description: "Lore conhecida, criação, primeira manifestação, regras e guia de gameplay."
type: "guia"
status: "rascunho"
visibility: "reservado"
order: 99
tags:
  - lucker
  - linhagem
updated: 2026-07-27
version: "Edição Final Consolidada v3"
origin: "01_Guia_Jogador_Lucker.html"
exports:
  pdf: false
  markdown: false
  html: false
---`
  }
];

const textOnly = (value) =>
  value
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const markdownHeadings = (value) =>
  [...value.matchAll(/^#{1,3}\s+(.+)$/gm)].map((match) =>
    match[1].replace(/[`*_]/g, "").trim()
  );

const htmlHeadings = (value) =>
  [...value.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)].map((match) =>
    textOnly(match[1])
  );

await mkdir(outputRoot, { recursive: true });

for (const migration of migrations) {
  const html = await readFile(resolve(sourceRoot, migration.html), "utf8");
  const markdown = await readFile(
    resolve(sourceRoot, migration.markdown),
    "utf8"
  );

  const htmlOutline = htmlHeadings(html);
  const markdownOutline = markdownHeadings(markdown);
  const missingFromMarkdown = htmlOutline.filter(
    (heading) => !markdownOutline.includes(heading)
  );

  if (missingFromMarkdown.length > 3) {
    throw new Error(
      `${migration.html}: o Markdown correspondente diverge do HTML em ${missingFromMarkdown.length} títulos.`
    );
  }

  const note =
    `<!-- Migração verificada contra ${migration.html}. ` +
    `O HTML permanece como fonte de conferência e o Markdown correspondente preserva o texto editável. -->`;

  const migratedBody =
    migration.output === "guia-lucker.md"
      ? "# Conteúdo reservado\n\n> A estrutura editorial está preparada, mas o texto integral permanece fora deste repositório público."
      : markdown.trim();

  await writeFile(
    resolve(outputRoot, migration.output),
    `${migration.frontmatter}\n\n${note}\n\n${migratedBody}\n`,
    "utf8"
  );
  console.log(`Migrado: ${migration.html} -> src/content/guias/${migration.output}`);
}
