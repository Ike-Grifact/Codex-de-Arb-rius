import {
  gameSymbolText,
  isGameSymbol,
  symbols
} from "../data/game-symbols.mjs";

const tokenPattern = /\{\{([a-z0-9-]+)(?::(\d+))?\}\}/g;
const excludedParents = new Set(["code", "inlineCode", "html"]);

const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const withBase = (path, base) => {
  const normalizedBase = base.endsWith("/") ? base : base + "/";
  return normalizedBase + path.replace(/^\/+/, "");
};

const symbolHtml = (type, count, base) => {
  const text = gameSymbolText(type, count);
  const source = withBase("symbols/" + symbols[type].file, base);
  const number = count === undefined ? "" : "<strong>" + count + "</strong>";

  return (
    '<span class="game-symbol" role="img" aria-label="' +
    escapeAttribute(text) +
    '" title="' +
    escapeAttribute(text) +
    '">' +
    number +
    '<img src="' +
    escapeAttribute(source) +
    '" alt="" width="22" height="22"></span>'
  );
};

const transformChildren = (parent, base) => {
  if (!Array.isArray(parent.children) || excludedParents.has(parent.type)) return;

  for (let index = 0; index < parent.children.length; index += 1) {
    const child = parent.children[index];
    if (child.type !== "text") {
      transformChildren(child, base);
      continue;
    }

    const value = child.value;
    const replacements = [];
    let cursor = 0;
    tokenPattern.lastIndex = 0;

    for (const match of value.matchAll(tokenPattern)) {
      const [token, type, rawCount] = match;
      if (!isGameSymbol(type)) continue;

      const start = match.index;
      if (start > cursor) {
        replacements.push({ type: "text", value: value.slice(cursor, start) });
      }

      const count = rawCount === undefined ? undefined : Number(rawCount);
      replacements.push({
        type: "html",
        value: symbolHtml(type, count, base)
      });
      cursor = start + token.length;
    }

    if (!replacements.length) continue;
    if (cursor < value.length) {
      replacements.push({ type: "text", value: value.slice(cursor) });
    }

    parent.children.splice(index, 1, ...replacements);
    index += replacements.length - 1;
  }
};

export default function remarkGameSymbols({ base = "/" } = {}) {
  return (tree) => transformChildren(tree, base);
}
