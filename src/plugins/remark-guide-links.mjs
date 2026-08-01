const guidePattern = /^guide:([a-z0-9-]+)$/;

const withBase = (path, base) => {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return normalizedBase + path.replace(/^\/+/, "");
};

const transformLinks = (node, base) => {
  if (node.type === "link") {
    const match = node.url?.match(guidePattern);
    if (match) node.url = withBase(`biblioteca/${match[1]}/`, base);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach((child) => transformLinks(child, base));
  }
};

export default function remarkGuideLinks({ base = "/" } = {}) {
  return (tree) => transformLinks(tree, base);
}
