import { Calendar, FileText, Shield } from "lucide-react";
import DecorativeGraph from "./DecorativeGraph";

const FEATURE_ICONS = [FileText, Calendar, Shield];

export default function LoginHero({ t }) {
  return (
    <section className="relative hidden flex-col justify-center overflow-hidden px-12 py-8 lg:flex">
      <div className="relative z-10 w-full max-w-[510px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary-light">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {t.console}
        </span>

        <h1 className="mb-0 mt-5 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl">
          {t.headline}
        </h1>

        <p className="mt-4 text-sm leading-6 text-ink-soft sm:text-[15px]">{t.description}</p>

        <ul className="m-0 mt-6 list-none space-y-3 p-0">
          {t.features.map((text, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <li key={text} className="flex items-center gap-3 text-sm text-ink-soft">
                <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/20 bg-primary/10 text-primary-light">
                  <Icon size={17} />
                </span>
                {text}
              </li>
            );
          })}
        </ul>
      </div>

      <DecorativeGraph />

      <p className="absolute bottom-6 start-12 z-10 text-xs text-ink-secondary">
        We Care NGO • Cairo, Egypt
      </p>
    </section>
  );
}
