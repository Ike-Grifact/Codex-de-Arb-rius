import { categoryIconSvg } from "../data/category-icons";

interface SearchEntry {
  title: string;
  type: string;
  category: string;
  categoryLabel: string;
  excerpt: string;
  tags: string[];
  link: string;
}

const root = document.querySelector<HTMLElement>("[data-search-root]");

if (root) {
  const base = root.dataset.base || "/";
  const form = root.querySelector<HTMLFormElement>("[data-search-form]");
  const input = root.querySelector<HTMLInputElement>("[data-search-input]");
  const resultsElement = root.querySelector<HTMLElement>("[data-search-results]");
  const summary = root.querySelector<HTMLElement>("[data-search-summary]");
  let index: SearchEntry[] = [];

  const normalize = (value: string) =>
    value
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .toLocaleLowerCase("pt-BR");

  const escapeHtml = (value: string) =>
    value.replace(/[&<>"']/g, (character) => {
      const entities: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };
      return entities[character];
    });

  const href = (path: string) => `${base.endsWith("/") ? base : `${base}/`}${path.replace(/^\/+/, "")}`;

  const render = (term: string) => {
    if (!resultsElement || !summary) return;
    const normalizedTerm = normalize(term.trim());
    if (normalizedTerm.length < 2) {
      resultsElement.innerHTML = "";
      summary.textContent = "Digite ao menos dois caracteres.";
      return;
    }

    const matches = index
      .map((entry) => {
        const title = normalize(entry.title);
        const haystack = normalize(`${entry.title} ${entry.type} ${entry.excerpt} ${entry.tags.join(" ")}`);
        const score = title.includes(normalizedTerm) ? 2 : haystack.includes(normalizedTerm) ? 1 : 0;
        return { entry, score };
      })
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, "pt-BR"));

    summary.textContent = `${matches.length} resultado${matches.length === 1 ? "" : "s"} para “${term.trim()}”.`;
    resultsElement.innerHTML = matches.length
      ? matches
          .map(
            ({ entry }) => `
              <article class="search-result">
                <div class="search-result__head">
                  <span class="type-mark" aria-hidden="true">${categoryIconSvg(entry.category)}</span>
                  <div>
                    <p class="card-eyebrow">${escapeHtml(entry.categoryLabel)} · ${escapeHtml(entry.type)}</p>
                    <h2><a href="${escapeHtml(href(entry.link))}">${escapeHtml(entry.title)}</a></h2>
                  </div>
                </div>
                <p>${escapeHtml(entry.excerpt)}</p>
                <div class="tag-list">${entry.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
              </article>`
          )
          .join("")
      : `<div class="empty-state"><h3>Nenhum resultado público</h3><p>Tente outro termo ou consulte a Biblioteca e o Compêndio.</p></div>`;
  };

  fetch(href("search-index.json"))
    .then((response) => {
      if (!response.ok) throw new Error("Índice indisponível");
      return response.json();
    })
    .then((data: SearchEntry[]) => {
      index = data;
      const initial = new URLSearchParams(location.search).get("q") || "";
      if (input && initial) {
        input.value = initial;
        render(initial);
      }
    })
    .catch(() => {
      if (summary) summary.textContent = "Não foi possível carregar o índice local.";
    });

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    const term = input?.value || "";
    render(term);
    const url = new URL(location.href);
    if (term.trim()) url.searchParams.set("q", term.trim());
    else url.searchParams.delete("q");
    history.replaceState({}, "", url);
  });

  input?.addEventListener("input", () => {
    if ((input.value || "").length >= 2) render(input.value);
  });
}
