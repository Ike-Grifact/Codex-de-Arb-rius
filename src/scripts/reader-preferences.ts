const root = document.documentElement;
const storageKey = "arborius-reader-preferences";
const defaults = { font: 1, wide: false, dark: false };
let preferences = defaults;

try {
  preferences = {
    ...defaults,
    ...JSON.parse(localStorage.getItem(storageKey) || "{}")
  };
} catch {
  preferences = defaults;
}

const apply = () => {
  root.style.setProperty("--reader-scale", String(preferences.font));
  root.classList.toggle("reader-wide", preferences.wide);
  root.classList.toggle("reader-dark", preferences.dark);
  localStorage.setItem(storageKey, JSON.stringify(preferences));
};

document.querySelectorAll<HTMLButtonElement>("[data-reader-action]").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.readerAction;
    if (action === "increase") {
      preferences.font = Math.min(1.25, +(preferences.font + 0.05).toFixed(2));
    }
    if (action === "decrease") {
      preferences.font = Math.max(0.9, +(preferences.font - 0.05).toFixed(2));
    }
    if (action === "width") preferences.wide = !preferences.wide;
    if (action === "theme") preferences.dark = !preferences.dark;
    apply();
  });
});

const progress = document.querySelector<HTMLElement>("[data-reader-progress]");
const updateProgress = () => {
  if (!progress) return;
  const maximum = document.documentElement.scrollHeight - innerHeight;
  const percent = maximum > 0 ? Math.min(100, (scrollY / maximum) * 100) : 0;
  progress.style.width = `${percent}%`;
};

addEventListener("scroll", updateProgress, { passive: true });
apply();
updateProgress();
