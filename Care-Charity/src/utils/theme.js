const KEY = "we-care.theme";
export const THEMES = ["dark", "light"];

export function getTheme() {
  try {
    const value = window.localStorage.getItem(KEY);
    return THEMES.includes(value) ? value : "dark";
  } catch {
    return "dark";
  }
}

export function saveTheme(theme) {
  if (!THEMES.includes(theme)) return;
  try {
    window.localStorage.setItem(KEY, theme);
  } catch {
    void 0;
  }
  document.documentElement.dataset.theme = theme;
}

export function initTheme() {
  document.documentElement.dataset.theme = getTheme();
}
