import { useState } from "react";
import { getLanguage, saveLanguage } from "@/utils/language";
import LoginCard from "./components/LoginCard";
import LoginHeader from "./components/LoginHeader";
import LoginHero from "./components/LoginHero";
import { translations } from "./constants/translations";

export default function Login() {
  const [language, setLanguage] = useState(getLanguage);
  const t = translations[language];

  const changeLanguage = (next) => {
    setLanguage(next);
    saveLanguage(next);
  };

  return (
    <main
      dir={language === "ar" ? "rtl" : "ltr"}
      className="relative h-dvh w-full overflow-hidden bg-canvas text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 start-0 hidden w-1/2 bg-linear-to-br from-primary/10 to-transparent rtl:bg-linear-to-bl lg:block"
      />

      <LoginHeader
        t={t}
        language={language}
        onLanguageChange={changeLanguage}
      />

      <div className="relative grid h-[calc(100dvh-76px)] grid-cols-1 overflow-y-auto lg:h-[calc(100dvh-100px)] lg:grid-cols-2">
        <LoginHero t={t} />

        <section className="flex px-4 py-6 sm:px-10 lg:border-s lg:border-border lg:px-8">
          <LoginCard t={t} />
        </section>
      </div>
    </main>
  );
}
