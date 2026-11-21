import { useState } from "react";
import { getTheme, saveTheme } from "@/utils/theme";

export default function useTheme() {
  const [theme, setTheme] = useState(getTheme);

  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    saveTheme(next);
  };

  return { theme, isLight: theme === "light", toggle };
}
