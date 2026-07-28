export const categoryIconPaths: Record<string, string> = {
  material:
    '<path d="M12 3c4 1.4 7 4.3 7 8.2 0 4.5-3.2 8-7.4 9.8-4.3-1.7-6.6-5-6.6-8.7C5 8.4 7.7 5.1 12 3Z"/><path d="M8.4 14.3c2.7.3 5.6-1.4 6-4.3.3-2-1.2-3.4-2.9-3.1-1.5.2-2.2 1.7-1.7 2.8.6 1.4 2.7 1.3 3.1-.2"/><path d="M8.2 17.2c1.2-1.8 3-3.2 5.3-4.1"/>',
  arma:
    '<path d="m4 20 5-5"/><path d="m8 16 8.8-8.8 2-3.2-3.2 2L6.8 14.8"/><path d="m6.2 13.2 4.6 4.6"/><path d="m3.8 18.2 2 2"/>',
  armadura:
    '<path d="M12 3 5.5 5.7v5.1c0 4.5 2.6 8.2 6.5 10.2 3.9-2 6.5-5.7 6.5-10.2V5.7L12 3Z"/><path d="M12 7v10"/><path d="M8.5 9.2 12 11l3.5-1.8"/>',
  ferramenta:
    '<path d="M14.8 6.4a4 4 0 0 0-5.2 5.2L4 17.2 6.8 20l5.6-5.6a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.8-2.8 2.4-2.4Z"/><path d="m14.5 16.5 2-2 3.5 3.5-2 2-3.5-3.5Z"/><path d="m16.5 16.5 1-1"/>',
  consumivel:
    '<path d="M9 3h6"/><path d="M10 3v5l-4 7.2A4 4 0 0 0 9.5 21h5a4 4 0 0 0 3.5-5.8L14 8V3"/><path d="M7.5 14h9"/><path d="M9.3 17.2h.1M13 16h.1M15.2 18h.1"/>',
  provisao:
    '<path d="M7 8h10l2 3v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-8l2-3Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/><path d="M8.5 13c2.2-1.6 4.8-1.6 7 0"/><path d="M12 12v5"/>',
  abrigo:
    '<path d="m3 20 9-16 9 16"/><path d="M7 20h10"/><path d="m12 4 1.4 16"/><path d="m12.8 12.2-4.6 7.8"/>',
  montaria:
    '<path d="M7 20v-6.5c0-2.5 1-4.8 3-6.3L14 4l3 2-1 3 2.5 2.5-2 3.5-3.5-1-2 2v4"/><path d="M10 10c2.2.3 4 .1 6-1"/><path d="M9 17h4"/><circle cx="14.7" cy="7.3" r=".7" fill="currentColor" stroke="none"/>',
  kit:
    '<rect x="4" y="7" width="16" height="13" rx="2"/><path d="M9 7V5h6v2"/><path d="M4 12h16"/><path d="M9 12v3h6v-3"/><path d="M12 15v5"/>',
  municao:
    '<path d="M8 20c-2.2-3.4-1.7-7.1 1.3-10.1L15 4.2c2.2 3.4 1.7 7.1-1.3 10.1L8 20Z"/><path d="m8 20 8-8"/><path d="M11 17c-1.8-.2-3-.9-4-2"/><path d="M14 14c.2-1.8.9-3 2-4"/>',
  projeto:
    '<path d="M7 5h9a3 3 0 0 1 0 6H8a3 3 0 0 0 0 6h9"/><path d="M7 5a3 3 0 0 0 0 6h1"/><path d="M17 17a3 3 0 1 1 0 6H8"/><path d="M10 8h4M10 14h5"/>',
  item:
    '<path d="m4 8 8-4 8 4-8 4-8-4Z"/><path d="m4 8 1 9 7 3 7-3 1-9"/><path d="M12 12v8"/><path d="m8 6 8 4"/>'
};

export const categoryIconName = (name: string | number | undefined) => {
  const id = String(name ?? "item");
  return categoryIconPaths[id] ? id : "item";
};

export const categoryIconSvg = (name: string | number | undefined) => {
  const id = categoryIconName(name);
  return (
    '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" ' +
    'fill="none" stroke="currentColor" stroke-width="1.7" ' +
    'stroke-linecap="round" stroke-linejoin="round">' +
    categoryIconPaths[id] +
    "</svg>"
  );
};
