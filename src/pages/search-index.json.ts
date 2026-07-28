import { getCollection } from "astro:content";

export const prerender = true;

const excerpt = (body: string, fallback: string) => {
  const clean = body
    .replace(/^---[\s\S]*?---/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>|[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return clean.slice(0, 230) || fallback;
};

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
    entries.filter(
      (entry) =>
        entry.data.visibility === "publico" &&
        entry.data.status !== "rascunho"
    );

  const results = [
    ...publicOnly(guides).map((entry) => ({
      title: entry.data.title,
      type: "guia",
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `biblioteca/${entry.data.slug}/`
    })),
    ...publicOnly(materials).map((entry) => ({
      title: entry.data.title,
      type: "material",
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `compendio/${entry.data.slug}/`
    })),
    ...publicOnly(items).map((entry) => ({
      title: entry.data.title,
      type: "item",
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `compendio/${entry.data.slug}/`
    })),
    ...publicOnly(lore).map((entry) => ({
      title: entry.data.title,
      type: entry.data.type,
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `mundo/#${entry.data.slug}`
    })),
    ...publicOnly(quests).filter((entry) => entry.data.state !== "oculta").map((entry) => ({
      title: entry.data.title,
      type: "quest",
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `quests/#${entry.data.slug}`
    })),
    ...publicOnly(sessions).map((entry) => ({
      title: entry.data.title,
      type: "sessão",
      excerpt: excerpt(entry.body ?? "", entry.data.description),
      tags: entry.data.tags,
      link: `cronicas/#${entry.data.slug}`
    }))
  ];

  return new Response(JSON.stringify(results), {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}
