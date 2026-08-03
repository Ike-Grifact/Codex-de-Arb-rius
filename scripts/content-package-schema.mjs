import { extname, posix } from "node:path";
import yaml from "js-yaml";

const { dump, load, JSON_SCHEMA } = yaml;

export const SCHEMA_VERSION = 1;
export const COLLECTIONS = [
  "guias",
  "materiais",
  "itens",
  "lore",
  "quests",
  "sessoes",
  "bestiario"
];
export const STATUSES = ["publicado", "rascunho"];
export const VISIBILITIES = ["publico", "reservado", "oculto"];
export const SAFE_ASSET_EXTENSIONS = [
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".avif"
];
export const EXECUTABLE_EXTENSIONS = [
  ".bat", ".cmd", ".com", ".cpl", ".dll", ".exe", ".hta", ".jar",
  ".js", ".jse", ".mjs", ".cjs", ".msi", ".php", ".pl", ".ps1",
  ".py", ".rb", ".scr", ".sh", ".ts", ".tsx", ".vbs", ".wsf"
];

const manifestKeys = new Set([
  "schemaVersion",
  "collection",
  "title",
  "slug",
  "status",
  "visibility",
  "tags",
  "related",
  "source",
  "contentFile",
  "assets",
  "frontmatter"
]);

const commonFields = ["title", "slug", "status", "visibility", "tags"];
const rules = {
  description: { type: "nonEmptyString" },
  type: { type: "nonEmptyString" },
  order: { type: "integer", min: 0 },
  cover: { type: "safeString" },
  updated: { type: "date" },
  version: { type: "nonEmptyString" },
  exports: { type: "exports" },
  category: { type: "stringOrInteger" },
  availability: { type: "nonEmptyString" },
  space: { type: "nonEmptyString" },
  sourceGuide: { type: "nonEmptyString" },
  state: {
    type: "enum",
    values: ["disponivel", "ativa", "concluida", "fracassada", "abandonada", "oculta"]
  },
  example: { type: "boolean" },
  number: { type: "number", min: 0 },
  date: { type: "date" },
  participants: { type: "stringArray" },
  origin: { type: "nonEmptyString" },
  related: { type: "stringArray" },
  title: { type: "nonEmptyString" },
  slug: { type: "slug" },
  status: { type: "enum", values: STATUSES },
  visibility: { type: "enum", values: VISIBILITIES },
  tags: { type: "stringArray" }
};

export const COLLECTION_SPECS = {
  guias: {
    extensions: [".md", ".mdx"],
    fixed: { type: "guia" },
    mapped: { origin: "source" },
    required: ["description", "updated"],
    optional: ["order", "cover", "version", "exports"]
  },
  materiais: {
    extensions: [".md"],
    fixed: { type: "material" },
    mapped: { origin: "source", related: "related" },
    required: ["description", "category", "availability", "updated"],
    optional: []
  },
  itens: {
    extensions: [".md"],
    fixed: { type: "item" },
    mapped: { origin: "source", related: "related" },
    required: ["description", "category", "availability", "updated"],
    optional: ["space"]
  },
  lore: {
    extensions: [".md"],
    fixed: {},
    mapped: { sourceGuide: "source", related: "related" },
    required: ["description", "type", "category", "updated"],
    optional: ["order"]
  },
  quests: {
    extensions: [".md"],
    fixed: {},
    mapped: {},
    required: ["description", "type", "state", "updated"],
    optional: ["example"]
  },
  sessoes: {
    extensions: [".md"],
    fixed: {},
    mapped: {},
    required: ["description", "type", "number", "date", "updated"],
    optional: ["participants", "example"]
  },
  bestiario: {
    extensions: [".md"],
    fixed: {},
    mapped: {},
    required: ["description", "type", "updated"],
    optional: ["example"]
  }
};

const isRecord = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);
const unique = (values) => [...new Set(values)];
const equal = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const valueLabel = (value) => JSON.stringify(value);

export const hasLocalMachineReference = (value) =>
  /[A-Za-z]:[\\/]/.test(String(value)) ||
  /(?:^|[\s('"=])file:\/\//i.test(String(value)) ||
  /\\\\[^\\]/.test(String(value));

const reservedWindowsName = /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i;
const safeSegment = (segment) =>
  /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(segment) &&
  !segment.endsWith(".") &&
  !reservedWindowsName.test(segment);

export const validateRelativePath = (value, label, { prefix, allowNested = true } = {}) => {
  const errors = [];
  if (typeof value !== "string" || !value.trim()) return [`${label} deve ser um caminho relativo não vazio.`];
  if (value !== value.trim()) errors.push(`${label} não pode ter espaços no início ou no fim.`);
  if (value.includes("\\")) errors.push(`${label} deve usar /, nunca \\.`);
  if (/^[A-Za-z]:/.test(value) || value.startsWith("/") || value.startsWith("//")) {
    errors.push(`${label} não pode ser absoluto.`);
  }
  if (hasLocalMachineReference(value)) errors.push(`${label} contém uma referência local de máquina.`);
  if (/[\u0000-\u001f\u007f]/.test(value)) errors.push(`${label} contém caracteres de controle.`);

  const segments = value.split("/");
  if (segments.some((segment) => segment === "..")) errors.push(`${label} não pode conter ...`);
  if (segments.some((segment) => segment === "." || segment === "")) {
    errors.push(`${label} não pode conter segmentos vazios ou ponto.`);
  }
  if (!allowNested && segments.length !== 1) errors.push(`${label} deve conter somente um nome de arquivo.`);
  for (const segment of segments) {
    if (segment && segment !== "." && segment !== ".." && !safeSegment(segment)) {
      errors.push(`${label} contém nome de arquivo inseguro: ${segment}`);
    }
  }
  if (prefix && segments[0] !== prefix) errors.push(`${label} deve permanecer dentro de ${prefix}/.`);
  if (posix.normalize(value) !== value) errors.push(`${label} não está normalizado.`);
  return unique(errors);
};

const validateStringArray = (value, label) => {
  if (!Array.isArray(value)) return [`${label} deve ser uma lista.`];
  const errors = [];
  for (const [index, item] of value.entries()) {
    if (typeof item !== "string" || !item.trim()) errors.push(`${label}[${index}] deve ser texto não vazio.`);
    else if (hasLocalMachineReference(item)) errors.push(`${label}[${index}] contém caminho local.`);
  }
  if (new Set(value.map((item) => String(item).toLocaleLowerCase("pt-BR"))).size !== value.length) {
    errors.push(`${label} contém valores duplicados.`);
  }
  return errors;
};

const validateRule = (field, value, rule) => {
  const label = `frontmatter.${field}`;
  if (!rule) return [`Campo sem regra de validação: ${label}.`];
  if (rule.type === "nonEmptyString" && (typeof value !== "string" || !value.trim())) {
    return [`${label} deve ser texto não vazio.`];
  }
  if (rule.type === "safeString") {
    if (typeof value !== "string" || !value.trim()) return [`${label} deve ser texto não vazio.`];
    if (hasLocalMachineReference(value)) return [`${label} contém caminho local.`];
  }
  if (rule.type === "integer" && (!Number.isInteger(value) || value < rule.min)) {
    return [`${label} deve ser um inteiro maior ou igual a ${rule.min}.`];
  }
  if (rule.type === "number" && (typeof value !== "number" || !Number.isFinite(value) || value < rule.min)) {
    return [`${label} deve ser um número maior ou igual a ${rule.min}.`];
  }
  if (rule.type === "boolean" && typeof value !== "boolean") return [`${label} deve ser booleano.`];
  if (rule.type === "enum" && !rule.values.includes(value)) {
    return [`${label} deve ser um de: ${rule.values.join(", ")}.`];
  }
  if (rule.type === "slug" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value ?? "")) {
    return [`${label} deve usar apenas letras minúsculas sem acento, números e hífens.`];
  }
  if (rule.type === "date") {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}(?:T[^\s]+)?$/.test(value) || Number.isNaN(Date.parse(value))) {
      return [`${label} deve ser uma data ISO válida, como 2026-08-03.`];
    }
  }
  if (rule.type === "stringArray") return validateStringArray(value, label);
  if (rule.type === "stringOrInteger") {
    if (!(typeof value === "string" && value.trim()) && !Number.isInteger(value)) {
      return [`${label} deve ser texto não vazio ou inteiro.`];
    }
  }
  if (rule.type === "exports") {
    if (!isRecord(value)) return [`${label} deve ser um objeto.`];
    const allowed = new Set(["pdf", "markdown", "html"]);
    const errors = Object.keys(value)
      .filter((key) => !allowed.has(key))
      .map((key) => `${label}.${key} não é permitido.`);
    for (const key of allowed) {
      if (key in value && typeof value[key] !== "boolean") errors.push(`${label}.${key} deve ser booleano.`);
    }
    return errors;
  }
  return [];
};

export const validateManifest = (input) => {
  const errors = [];
  const warnings = [];
  if (!isRecord(input)) return { errors: ["manifest.json deve conter um objeto JSON."], warnings, manifest: null };

  for (const key of Object.keys(input)) {
    if (!manifestKeys.has(key)) errors.push(`Campo desconhecido no manifesto: ${key}.`);
  }
  if (input.schemaVersion !== SCHEMA_VERSION) errors.push(`schemaVersion deve ser ${SCHEMA_VERSION}.`);
  if (!COLLECTIONS.includes(input.collection)) errors.push(`collection deve ser uma coleção suportada: ${COLLECTIONS.join(", ")}.`);
  if (typeof input.title !== "string" || !input.title.trim()) errors.push("title deve ser texto não vazio.");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug ?? "")) {
    errors.push("slug deve usar apenas letras minúsculas sem acento, números e hífens.");
  }
  if (!STATUSES.includes(input.status)) errors.push(`status deve ser um de: ${STATUSES.join(", ")}.`);
  if (!VISIBILITIES.includes(input.visibility)) errors.push(`visibility deve ser um de: ${VISIBILITIES.join(", ")}.`);
  if (input.visibility === "reservado" || input.visibility === "oculto") {
    errors.push(
      `Conteúdo com visibility "${input.visibility}" é proibido neste repositório público. ` +
      "Mantenha este pacote e seu conteúdo fora do repositório público."
    );
  }
  errors.push(...validateStringArray(input.tags, "tags"));
  errors.push(...validateStringArray(input.related, "related"));
  if (Array.isArray(input.tags)) {
    for (const [index, tag] of input.tags.entries()) {
      if (typeof tag === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(tag)) {
        errors.push(`tags[${index}] deve usar formato de slug seguro.`);
      }
    }
  }
  if (Array.isArray(input.related)) {
    for (const [index, related] of input.related.entries()) {
      if (typeof related === "string" && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(related)) {
        errors.push(`related[${index}] deve usar formato de slug seguro.`);
      }
    }
  }
  if (typeof input.source !== "string" || !input.source.trim()) errors.push("source deve ser texto não vazio.");
  else if (hasLocalMachineReference(input.source)) errors.push("source não pode conter caminho de máquina local.");

  errors.push(...validateRelativePath(input.contentFile, "contentFile", { prefix: "content" }));
  const spec = COLLECTION_SPECS[input.collection];
  if (spec && typeof input.contentFile === "string") {
    const extension = extname(input.contentFile).toLowerCase();
    if (!spec.extensions.includes(extension)) {
      errors.push(`${input.collection} aceita conteúdo com extensão: ${spec.extensions.join(", ")}.`);
    }
  }

  if (!Array.isArray(input.assets)) errors.push("assets deve ser uma lista.");
  const assets = [];
  for (const [index, entry] of (Array.isArray(input.assets) ? input.assets : []).entries()) {
    const asset = typeof entry === "string" ? { source: entry, target: posix.basename(entry) } : entry;
    if (!isRecord(asset)) {
      errors.push(`assets[${index}] deve ser texto ou objeto { source, target }.`);
      continue;
    }
    for (const key of Object.keys(asset)) {
      if (!new Set(["source", "target"]).has(key)) errors.push(`assets[${index}].${key} não é permitido.`);
    }
    const target = asset.target || (typeof asset.source === "string" ? posix.basename(asset.source) : "");
    errors.push(...validateRelativePath(asset.source, `assets[${index}].source`, { prefix: "assets" }));
    errors.push(...validateRelativePath(target, `assets[${index}].target`));
    const extension = extname(target).toLowerCase();
    if (!SAFE_ASSET_EXTENSIONS.includes(extension)) {
      errors.push(`assets[${index}].target deve ser imagem aprovada: ${SAFE_ASSET_EXTENSIONS.join(", ")}.`);
    }
    if (EXECUTABLE_EXTENSIONS.includes(extname(asset.source ?? "").toLowerCase())) {
      errors.push(`assets[${index}].source possui extensão executável proibida.`);
    }
    assets.push({ source: asset.source, target });
  }
  const duplicateSource = assets.map((asset) => asset.source.toLowerCase());
  const duplicateTarget = assets.map((asset) => asset.target.toLowerCase());
  if (new Set(duplicateSource).size !== duplicateSource.length) errors.push("assets contém origens duplicadas.");
  if (new Set(duplicateTarget).size !== duplicateTarget.length) errors.push("assets contém destinos duplicados.");

  if (input.frontmatter !== undefined && !isRecord(input.frontmatter)) {
    errors.push("frontmatter deve ser um objeto quando informado.");
  }
  if (spec && isRecord(input.frontmatter)) {
    const allowed = new Set([...spec.required, ...spec.optional]);
    for (const field of Object.keys(input.frontmatter)) {
      if (!allowed.has(field)) {
        errors.push(`frontmatter.${field} não é aceito para ${input.collection}; use os campos de nível superior quando aplicável.`);
      }
    }
  }
  if (spec && Array.isArray(input.related) && input.related.length && !Object.values(spec.mapped).includes("related")) {
    warnings.push(`A coleção ${input.collection} não possui campo related no schema atual; a lista será mantida apenas no manifesto.`);
  }

  return {
    errors: unique(errors),
    warnings: unique(warnings),
    manifest: errors.length ? null : { ...input, frontmatter: input.frontmatter ?? {}, assets }
  };
};

export const parseContentDocument = (source, fileLabel = "documento") => {
  const normalized = String(source).replace(/^\uFEFF/, "");
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) return { frontmatter: {}, body: normalized, errors: [] };
  const errors = [];
  if (/(?:^|\s)[&*!][A-Za-z0-9_-]+/.test(match[1]) || /!![A-Za-z]/.test(match[1])) {
    errors.push(`${fileLabel}: aliases, âncoras e tags YAML não são permitidos.`);
  }
  let frontmatter = {};
  try {
    frontmatter = load(match[1], { schema: JSON_SCHEMA, json: true }) ?? {};
    if (!isRecord(frontmatter)) errors.push(`${fileLabel}: o frontmatter deve ser um objeto.`);
  } catch (error) {
    errors.push(`${fileLabel}: frontmatter YAML inválido: ${error.message}`);
  }
  return { frontmatter: isRecord(frontmatter) ? frontmatter : {}, body: normalized.slice(match[0].length), errors };
};

export const resolveFrontmatter = (manifest, documentFrontmatter = {}) => {
  const spec = COLLECTION_SPECS[manifest.collection];
  const errors = [];
  const warnings = [];
  const allowedDocument = new Set([
    ...commonFields,
    ...Object.keys(spec.fixed),
    ...Object.keys(spec.mapped),
    ...spec.required,
    ...spec.optional
  ]);
  for (const field of Object.keys(documentFrontmatter)) {
    if (!allowedDocument.has(field)) errors.push(`Frontmatter do documento contém campo incompatível com ${manifest.collection}: ${field}.`);
  }

  const output = {};
  for (const field of commonFields) {
    const expected = manifest[field];
    if (field in documentFrontmatter && !equal(documentFrontmatter[field], expected)) {
      errors.push(`Conflito em ${field}: manifesto=${valueLabel(expected)}, documento=${valueLabel(documentFrontmatter[field])}.`);
    }
    output[field] = expected;
  }
  for (const [field, value] of Object.entries(spec.fixed)) {
    if (field in documentFrontmatter && !equal(documentFrontmatter[field], value)) {
      errors.push(`O campo ${field} deve ser ${valueLabel(value)} para ${manifest.collection}.`);
    }
    output[field] = value;
  }
  for (const [field, manifestField] of Object.entries(spec.mapped)) {
    const expected = manifest[manifestField];
    if (field in documentFrontmatter && !equal(documentFrontmatter[field], expected)) {
      errors.push(`Conflito em ${field}: manifesto=${valueLabel(expected)}, documento=${valueLabel(documentFrontmatter[field])}.`);
    }
    output[field] = expected;
  }
  for (const field of [...spec.required, ...spec.optional]) {
    const fromManifest = manifest.frontmatter?.[field];
    const fromDocument = documentFrontmatter[field];
    if (fromManifest !== undefined && fromDocument !== undefined && !equal(fromManifest, fromDocument)) {
      errors.push(`Conflito em frontmatter.${field} entre manifesto e documento.`);
      continue;
    }
    const value = fromManifest !== undefined ? fromManifest : fromDocument;
    if (value === undefined) {
      if (spec.required.includes(field)) errors.push(`Campo obrigatório ausente para ${manifest.collection}: frontmatter.${field}.`);
      continue;
    }
    output[field] = value;
  }

  for (const [field, value] of Object.entries(output)) {
    errors.push(...validateRule(field, value, rules[field]));
    if (typeof value === "string" && hasLocalMachineReference(value)) {
      errors.push(`frontmatter.${field} contém referência para disco ou máquina local.`);
    }
  }
  return { frontmatter: output, errors: unique(errors), warnings };
};

const withoutCodeExamples = (source) =>
  String(source)
    .replace(/```[\s\S]*?```/g, "")
    .replace(/~~~[\s\S]*?~~~/g, "")
    .replace(/`[^`\r\n]*`/g, "");

export const validateContentSecurity = (body, extension) => {
  const errors = [];
  if (!String(body).trim()) errors.push("O documento não possui conteúdo após o frontmatter.");
  if (String(body).includes("\u0000")) errors.push("O documento contém byte nulo.");
  if (hasLocalMachineReference(body)) errors.push("O documento contém referência para disco ou máquina local.");
  const active = withoutCodeExamples(body);
  const htmlRisks = [
    [/<\s*script\b/i, "HTML com <script> não é permitido."],
    [/\son[a-z]+\s*=/i, "Atributos de evento HTML não são permitidos."],
    [/javascript\s*:/i, "URLs javascript: não são permitidas."],
    [/<\s*(?:iframe|object|embed)\b/i, "Elementos HTML ativos não são permitidos."],
    [/<\s*meta\b[^>]*http-equiv/i, "Redirecionamentos HTML não são permitidos."]
  ];
  for (const [pattern, message] of htmlRisks) if (pattern.test(active)) errors.push(message);

  if (extension === ".mdx") {
    if (/^\s*(?:import|export)\s/m.test(active)) errors.push("MDX com import ou export não é permitido.");
    if (/<[A-Z][A-Za-z0-9.]*(?:\s|\/?>)/.test(active)) errors.push("Componentes JSX executáveis não são permitidos no MDX importado.");
    const withoutTokens = active.replace(/\{\{[^{}]+\}\}/g, "");
    if (/[{}]/.test(withoutTokens)) errors.push("Expressões JavaScript em chaves não são permitidas no MDX importado.");
  }
  return unique(errors);
};

export const extractAssetReferences = (body) => {
  const source = withoutCodeExamples(body);
  const references = [];
  for (const match of source.matchAll(/!\[[^\]]*\]\((?:<)?([^\s)>]+)(?:>)?(?:\s+["'][^)]*)?\)/g)) {
    references.push(match[1]);
  }
  for (const match of source.matchAll(/<(?:img|source)\b[^>]*\b(?:src|srcset)\s*=\s*["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) references.push(candidate.trim().split(/\s+/)[0]);
  }
  return unique(references);
};

export const classifyAssetReference = (reference) => {
  if (/^https?:\/\//i.test(reference)) return { kind: "remote" };
  if (/^(?:data|blob|javascript):/i.test(reference)) return { kind: "unsafe", reason: "esquema de URL não permitido" };
  const path = reference.split(/[?#]/, 1)[0];
  const errors = validateRelativePath(path, `referência de asset ${reference}`, { prefix: "assets" });
  return errors.length ? { kind: "unsafe", reason: errors.join(" ") } : { kind: "package", path };
};

export const renderContentDocument = (frontmatter, body) => {
  const serialized = dump(frontmatter, {
    schema: JSON_SCHEMA,
    noRefs: true,
    noCompatMode: true,
    lineWidth: 100,
    quotingType: '"',
    forceQuotes: true,
    sortKeys: false
  });
  return `---\n${serialized}---\n\n${String(body).trim()}\n`;
};

export const rewriteAssetReferences = (body, manifest) => {
  let output = String(body);
  const rewrites = [];
  for (const asset of manifest.assets) {
    const destination = `/images/content/${manifest.slug}/${asset.target}`;
    const escaped = asset.source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const pattern = new RegExp(`(^|[\\s(\\"',])${escaped}(?=[?#\\s\\"'),>]|$)`, "gm");
    const replaced = output.replace(pattern, (_match, prefix) => `${prefix}${destination}`);
    if (replaced !== output) rewrites.push({ from: asset.source, to: destination });
    output = replaced;
  }
  return { body: output, rewrites };
};