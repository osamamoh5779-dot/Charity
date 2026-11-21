import { Lock } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginCard({ t }) {
  return (
    <div className="m-auto w-full max-w-[440px]">
      <div className="rounded-2xl border border-border-light bg-card p-6 shadow-xl sm:p-8">
        <span className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-primary/25 bg-primary/10 text-primary-light">
          <Lock size={21} />
        </span>

        <h2 className="m-0 text-[26px] font-bold tracking-tight text-ink">{t.signIn}</h2>
        <p className="mb-0 mt-1 text-sm text-ink-soft">{t.subtitle}</p>

        <LoginForm t={t} />

        <p className="mb-0 mt-4 text-center text-[11px] leading-relaxed text-ink-secondary">{t.footer}</p>
      </div>

      <footer className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-ink-secondary">
        <span>© We Care</span>
        <a href="mailto:support@wecare.org" className="hover:text-primary-light">
          {t.help}
        </a>
        <a href="/privacy" className="hover:text-primary-light">
          {t.privacy}
        </a>
      </footer>
    </div>
  );
}
