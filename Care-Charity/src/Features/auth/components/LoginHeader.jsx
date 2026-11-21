import ThemeToggle from "@/Components/ui/ThemeToggle";
import Tabs from "@/Components/ui/Tabs";
import Brand from "./Brand";

const LANGUAGES = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "EN" },
];

export default function LoginHeader({ t, language, onLanguageChange }) {
  return (
    <header className="relative z-10 flex h-[76px] items-center justify-between gap-3 px-4 sm:px-10 lg:h-[100px] lg:px-12">
      <Brand />

      <div className="flex items-center gap-2 sm:gap-3">
        <Tabs variant="segmented" items={LANGUAGES} value={language} onChange={onLanguageChange} />
        <ThemeToggle label={t.toggleTheme} />
      </div>
    </header>
  );
}
