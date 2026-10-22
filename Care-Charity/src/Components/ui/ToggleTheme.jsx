import { Moon, Sun } from "lucide-react";
import IconButton from "./IconButton";
import useTheme from "../../hooks/useTheme";

export default function ToggleTheme({ size = "sm", ...props }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <IconButton
      icon={isDark ? Sun : Moon}
      size={size}
      label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      variant="ghost"
      onClick={toggle}
      {...props}
    />
  );
}
