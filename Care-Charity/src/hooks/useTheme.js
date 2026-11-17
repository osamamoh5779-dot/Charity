import { useSyncExternalStore } from "react";

const KEY = "theme";
const listeners = new Set();

const getTheme = () =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* */
  }
  listeners.forEach((l) => l());
}

const subscribe = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark");
  return {
    theme,
    setTheme,
    toggle: () => setTheme(getTheme() === "dark" ? "light" : "dark"),
  };
}
