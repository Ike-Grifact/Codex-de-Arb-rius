import { getCollection } from "astro:content";
import {
  categoryLabel,
  tagLabel,
  typeLabel
} from "../data/taxonomy";

export const prerender = true;

const excerpt = (body: string, fallback: string) => {
  const clean = body
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/^import\s+.+?;\s*$/gm, "")
    .replace(/\{\{(?:lore:)?[^}]+\}\}/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>|[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.slice(0, 230) || fallback;
};

const labels = (tags: string[]) => tags.map(tagLabel);

export async function GET() {
  const [guides, materials, items, lore, quests, sessions] = await Promise.all([
    getCollection("guias"),
    getCollection("materiais"),
    getCollection("itens"),
    getCollection("lore"),
    getCollection("quests"),
    getCollection("sessoes")
  ]);

  const publicOnly = <T extends { data: { visibility: string; status: string } }>(entries: T[]) =>
    entries.filter((entry) =>
      entry.data.visibility === "publico" && entry.data.status !== "rascunho"
    );

  const results = [
    ...publicOnly(guides).map((entry) => ({
      title: entry.data.title,
      type: typeLabel("guia"),
      category: "item",
      categoryLabel: typeLabel("guia"),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `biblioteca/${entry.data.slug}/`
    })),
    ...publicOnly(materials).map((entry) => ({
      title: entry.data.title,
      type: typeLabel("material"),
      category: "material",
      categoryLabel: categoryLabel("material"),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `compendio/${entry.data.slug}/`
    })),
    ...publicOnly(items).map((entry) => ({
      title: entry.data.title,
      type: typeLabel("item"),
      category: entry.data.category,
      categoryLabel: categoryLabel(entry.data.category),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `compendio/${entry.data.slug}/`
    })),
    ...publicOnly(lore).map((entry) => ({
      title: entry.data.title,
      type: typeLabel(entry.data.type),
      category: "item",
      categoryLabel: categoryLabel(entry.data.category),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `mundo/#${entry.data.slug}`
    })),
    ...publicOnly(quests).filter((entry) => entry.data.state !== "oculta").map((entry) => ({
      title: entry.data.title,
      type: typeLabel("quest"),
      category: "item",
      categoryLabel: typeLabel("quest"),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `quests/#${entry.data.slug}`
    })),
    ...publicOnly(sessions).map((entry) => ({
      title: entry.data.title,
      type: typeLabel("sessao"),
      category: "item",
      categoryLabel: typeLabel("sessao"),
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: labels(entry.data.tags),
      link: `cronicas/#${entry.data.slug}`
    }))
  ];

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}
