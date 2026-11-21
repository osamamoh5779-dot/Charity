import { Moon, Sun } from "lucide-react";
import IconButton from "@/components/ui/IconButton";
import useTheme from "@/hooks/useTheme";

export default function ThemeToggle({ label = "Toggle color theme" }) {
  const { isLight, toggle } = useTheme();
  return (
    <IconButton
      icon={isLight ? Sun : Moon}
      label={label}
      variant="secondary"
      size="md"
      onClick={toggle}
    />
  );
}
