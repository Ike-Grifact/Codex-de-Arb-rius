const withBase = (path, base) => {
  const normalizedBase = `/${String(base || "/").replace(/^\/+|\/+$/g, "")}`;
  const prefix = normalizedBase === "/" ? "/" : `${normalizedBase}/`;
  return `${prefix}${String(path).replace(/^\/+/, "")}`;
};

const contentAsset = /^\/images\/content\//;

const visit = (node, base) => {
  if (!node || typeof node !== "object") return;

  if ((node.type === "image" || node.type === "link") && contentAsset.test(node.url ?? "")) {
    node.url = withBase(node.url, base);
  }

  if (node.type === "html" && typeof node.value === "string") {
    node.value = node.value.replace(
      /\b(src|href)=(['"])(\/images\/content\/[^'"]+)\2/gi,
      (_match, attribute, quote, path) =>
        `${attribute}=${quote}${withBase(path, base)}${quote}`
    );
  }

  for (const child of node.children ?? []) visit(child, base);
};

export default function remarkContentAssets({ base = "/" } = {}) {
  return (tree) => visit(tree, base);
}