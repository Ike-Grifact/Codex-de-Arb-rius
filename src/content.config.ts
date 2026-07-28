import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const visibility = z.enum(["publico", "reservado", "oculto"]).default("publico");
const exportOptions = z
  .object({
    pdf: z.boolean().default(true),
    markdown: z.boolean().default(true),
    html: z.boolean().default(false)
  })
  .default({ pdf: true, markdown: true, html: false });

const guias = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/guias" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.literal("guia"),
    status: z.enum(["publicado", "rascunho"]),
    visibility,
    order: z.number().default(99),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date(),
    version: z.string().optional(),
    origin: z.string(),
    exports: exportOptions
  })
});

const materiais = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/materiais" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.literal("material"),
    category: z.number(),
    availability: z.string(),
    visibility,
    status: z.enum(["publicado", "rascunho"]).default("publicado"),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    origin: z.string(),
    updated: z.coerce.date()
  })
});

const itens = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/itens" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    type: z.literal("item"),
    category: z.string(),
    availability: z.string(),
    visibility,
    status: z.enum(["publicado", "rascunho"]).default("publicado"),
    space: z.string().optional(),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    origin: z.string(),
    updated: z.coerce.date()
  })
});

const publicEntry = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.string(),
  visibility,
  status: z.enum(["publicado", "rascunho"]).default("publicado"),
  tags: z.array(z.string()).default([]),
  example: z.boolean().default(false),
  updated: z.coerce.date()
});

const lore = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lore" }),
  schema: publicEntry
});

const quests = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/quests" }),
  schema: publicEntry.extend({
    state: z.enum([
      "disponivel",
      "ativa",
      "concluida",
      "fracassada",
      "abandonada",
      "oculta"
    ])
  })
});

const sessoes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/sessoes" }),
  schema: publicEntry.extend({
    number: z.number(),
    date: z.coerce.date(),
    participants: z.array(z.string()).default([])
  })
});

const bestiario = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/bestiario" }),
  schema: publicEntry
});

export const collections = {
  guias,
  materiais,
  itens,
  lore,
  quests,
  sessoes,
  bestiario
};
