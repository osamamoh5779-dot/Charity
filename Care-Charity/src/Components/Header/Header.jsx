import { useQueryClient } from "@tanstack/react-query";
import { UserMenu, changeLanguage as saveUserLocale } from "@/Features/auth";
import Tabs from "@/Components/ui/Tabs";
import ThemeToggle from "@/Components/ui/ThemeToggle";
import useLanguage from "@/hooks/useLanguage";
import { saveLanguage } from "@/utils/language";
import "./Header.css";

const LANGUAGES = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "EN" },
];

export default function Header() {
  const queryClient = useQueryClient();
  const language = useLanguage();

  const changeLanguage = async (next) => {
    if (next === language) return;
    saveLanguage(next); 
    try {
     
      await saveUserLocale(next);
    } catch {
      void 0;
    }
    await queryClient.invalidateQueries();
  };

  return (
    <header className="sticky top-0 z-30 flex h-15 items-center justify-end gap-3 border-b border-border bg-sidebar/70 px-6 backdrop-blur">
      <Tabs
        variant="segmented"
        items={LANGUAGES}
        value={language}
        onChange={changeLanguage}
      />
      <ThemeToggle />
      <UserMenu />
    </header>
  );
}
