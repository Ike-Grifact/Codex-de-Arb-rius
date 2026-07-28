import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkGameSymbols from "./src/plugins/remark-game-symbols.mjs";
import remarkLoreIncludes from "./src/plugins/remark-lore-includes.mjs";

const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repository.endsWith(".github.io");

const inferredBase =
  process.env.GITHUB_ACTIONS === "true" && repository && !isUserSite
    ? `/${repository}`
    : "/";

const base = process.env.PUBLIC_BASE || inferredBase;

const site =
  process.env.SITE_URL ||
  (process.env.GITHUB_REPOSITORY_OWNER
    ? `https://${process.env.GITHUB_REPOSITORY_OWNER}.github.io`
    : "https://example.github.io");

export default defineConfig({
  site,
  base,
  output: "static",
  trailingSlash: "always",

  integrations: [mdx()],

  markdown: {
    remarkPlugins: [
      remarkLoreIncludes,
      [remarkGameSymbols, { base }]
    ],
    shikiConfig: {
      theme: "github-dark",
    },
  },

  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
