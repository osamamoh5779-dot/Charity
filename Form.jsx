
import { useState } from "react";

import {
  FiHeart,
  FiLock,
  FiMail,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiFileText,
  FiCalendar,
  FiShield,
  FiMoon,
  FiSun,
} from "react-icons/fi";

const translations = {
  en: {
    console: "Admin Console",
    headline: "Manage every case, donation and installment in one place",
    description:
      "Secure access for We Care staff to review donations, follow cases and support families.",
    features: [
      "Review donation receipts",
      "Track monthly installments",
      "Follow every case to completion",
    ],
    signIn: "Sign in",
    subtitle: "Enter your account details to access the dashboard",
    email: "Email",
    password: "Password",
    remember: "Remember me",
    forgot: "Forgot password?",
    footer:
      "Accounts are created by the Super Admin. Contact your administrator if you need access.",
    help: "Help",
    privacy: "Privacy",
    placeholder: "Enter your email",
  },
  ar: {
    console: "لوحة الإدارة",
    headline: "تبرع الي كل حالة وتبرع وقسط في مكان واحد",
    description:
      "دخول آمن لفريق We Care لمراجعة التبرعات ومتابعة الحالات ودعم الأسر.",
    features: [
      " إيصالات التبرعات",
      "متابعة الأقساط الشهرية",
      "متابعة كل حالة حتى اكتمالها",
    ],
    signIn: "تسجيل الدخول",
    subtitle: "أدخل بيانات حسابك للوصول إلى لوحة التحكم",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    remember: "تذكرني",
    forgot: "نسيت كلمة المرور؟",
    footer:
      "يتم إنشاء الحسابات بواسطة المسؤول الرئيسي. تواصل مع المسؤول للحصول على صلاحية الدخول.",
    help: "المساعدة",
    privacy: "الخصوصية",
    placeholder: "أدخل بريدك الإلكتروني",
  },
};

function Brand() {
  return (
    <a href="/" className="flex items-center gap-3">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/[0.06] text-cyan-400 shadow-[0_0_22px_rgba(34,211,238,0.08)]">
        <FiHeart size={22} />
      </div>

      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-slate-100">
            We Care
          </span>
          <span className="rounded border border-cyan-400/30 bg-cyan-400/10 px-1.5 py-0.5 text-[9px] font-semibold tracking-wide text-cyan-400">
            EGP
          </span>
        </div>

        <p className="mt-0.5 text-[10px] tracking-[0.19em] text-slate-500">
          CHARITY OPERATIONS
        </p>
      </div>
    </a>
  );
}

function DecorativeGraph() {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      className="pointer-events-none absolute bottom-8 right-0 hidden w-[72%] max-w-[420px] opacity-40 lg:block"
      aria-hidden="true"
    >
      <path
        d="M5 190 C85 185 112 130 160 125 S245 100 285 80 S340 65 400 20"
        stroke="#155e75"
        strokeWidth="1.5"
        strokeDasharray="3 5"
      />
      <path
        d="M65 210 C130 175 160 115 205 135 S295 110 335 65 S380 35 405 0"
        stroke="#164e63"
        strokeWidth="1.5"
      />
      <path
        d="M155 210 C185 180 235 200 280 165 S345 135 390 100"
        stroke="#155e75"
        strokeWidth="1.2"
      />

      {[160, 220, 285, 365, 315].map((x, index) => {
        const y = [125, 110, 80, 40, 165][index];

        return (
          <g key={x}>
            <circle
              cx={x}
              cy={y}
              r="5"
              fill="#082b40"
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <circle cx={x} cy={y} r="1.6" fill="#22d3ee" />
          </g>
        );
      })}

      <circle cx="105" cy="172" r="2.5" fill="#22d3ee" />
      <circle cx="65" cy="205" r="2.5" fill="#22d3ee" />
    </svg>
  );
}

function Feature({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-cyan-400/20 bg-cyan-400/[0.07] text-cyan-400">
        <Icon size={17} />
      </div>

      <span className="text-sm text-slate-200">{children}</span>
    </div>
  );
}

function LoginCard({ t, language }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage(
        language === "en"
          ? "Please enter your email and password."
          : "يرجى إدخال البريد الإلكتروني وكلمة المرور."
      );
      return;
    }

    // Connect your authentication API here.
    setMessage(
      language === "en"
        ? "Connect your authentication API to sign in."
        : "يرجى ربط النموذج بخادم المصادقة."
    );
  };

  return (
    <div className="w-full max-w-[440px]">
      <div className="rounded-[22px] border border-white/[0.11] bg-[#101727]/95 px-6 py-6 shadow-[0_25px_80px_rgba(0,0,0,0.24)] sm:px-8 sm:py-7">
        <div className="mb-4 grid h-11 w-11 place-items-center rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-400">
          <FiLock size={21} />
        </div>

        <h2 className="text-[26px] font-bold tracking-tight text-slate-100">
          {t.signIn}
        </h2>

        <p className="mt-1 max-w-[310px] text-sm leading-5 text-slate-300">
          {t.subtitle}
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium text-slate-300"
            >
              {t.email}
            </label>

            <div className="flex h-11 items-center gap-3 rounded-xl border border-cyan-400 bg-[#09111e] px-3.5 shadow-[0_0_0_3px_rgba(34,211,238,0.10)] transition focus-within:shadow-[0_0_0_4px_rgba(34,211,238,0.16)]">
              <FiMail size={17} className="shrink-0 text-cyan-400" />

              <input
                id="email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={t.placeholder}
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-medium text-slate-300"
            >
              {t.password}
            </label>

            <div className="flex h-11 items-center gap-3 rounded-xl border border-white/10 bg-[#0b1220] px-3.5 transition focus-within:border-cyan-400/60">
              <FiLock size={17} className="shrink-0 text-slate-500" />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                className="min-w-0 flex-1 bg-transparent text-sm text-slate-200 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 text-slate-400 transition hover:text-cyan-400"
              >
                {showPassword ? <FiEyeOff size={17} /> : <FiEye size={17} />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[12px]">
            <label className="flex cursor-pointer items-center gap-2 text-slate-300">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
                className="h-[18px] w-[18px] cursor-pointer accent-cyan-400"
              />
              {t.remember}
            </label>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  language === "en"
                    ? "Please contact your administrator to reset your password."
                    : "يرجى التواصل مع المسؤول لإعادة تعيين كلمة المرور."
                )
              }
              className="font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              {t.forgot}
            </button>
          </div>

          {message && (
            <p
              role="status"
              className="rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] p-2.5 text-xs leading-5 text-cyan-200"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-sm font-semibold text-[#071321] shadow-[0_8px_25px_rgba(6,182,212,0.16)] transition hover:brightness-110 active:scale-[0.99]"
          >
            {t.signIn}
            <FiArrowRight size={17} />
          </button>
        </form>

        <p className="mx-auto mt-4 max-w-[340px] text-center text-[11px] leading-[1.6] text-slate-400">
          {t.footer}
        </p>
      </div>

      <footer className="mt-3 flex items-center justify-center gap-3 text-xs text-slate-400">
        <span>© We Care</span>
        <span className="text-slate-600">•</span>

        <a
          href="mailto:support@wecare.org"
          className="hover:text-cyan-400"
        >
          {t.help}
        </a>

        <span className="text-slate-600">•</span>

        <a href="/privacy" className="hover:text-cyan-400">
          {t.privacy}
        </a>
      </footer>
    </div>
  );
}

export default function Form() {
  const [language, setLanguage] = useState("en");
  const [light, setLight] = useState(false);

  const t = translations[language];
  const isArabic = language === "ar";

  return (
    <main
      dir={isArabic ? "rtl" : "ltr"}
      className={`h-dvh w-full overflow-hidden ${
        light
          ? "bg-slate-100 text-slate-900"
          : "bg-[#070c17] text-slate-100"
      }`}
    >
      {/* Left background */}
      <div
        className={`pointer-events-none absolute inset-y-0 left-0 hidden w-1/2 lg:block ${
          light
            ? "bg-gradient-to-br from-cyan-100 via-slate-100 to-slate-200"
            : "bg-gradient-to-br from-[#0b2633] via-[#091426] to-[#0a1c30]"
        }`}
      />

      {/* Ambient glow */}
      <div
        className={`pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full blur-[120px] ${
          light ? "bg-cyan-300/20" : "bg-cyan-500/[0.06]"
        }`}
      />

      {/* Header */}
      <header className="relative z-10 flex h-[76px] shrink-0 items-center justify-between gap-3 px-5 sm:px-10 lg:h-[100px] lg:px-12">
        <Brand />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-xl border border-white/[0.08] bg-white/[0.025] p-1">
            <button
              type="button"
              onClick={() => setLanguage("ar")}
              aria-pressed={isArabic}
              className={`rounded-lg px-2.5 py-2 text-[11px] font-medium transition sm:px-3 sm:text-xs ${
                isArabic
                  ? "bg-cyan-400 text-[#071321]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              العربية
            </button>

            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-pressed={!isArabic}
              className={`rounded-lg px-2.5 py-2 text-[11px] font-semibold transition sm:px-3 sm:text-xs ${
                !isArabic
                  ? "bg-cyan-400 text-[#071321] shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setLight((previous) => !previous)}
            aria-label="Toggle color theme"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-slate-400 transition hover:border-cyan-400/40 hover:text-cyan-400 sm:h-10 sm:w-10"
          >
            {light ? <FiSun size={17} /> : <FiMoon size={17} />}
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="relative grid h-[calc(100dvh-76px)] grid-cols-1 overflow-y-auto lg:h-[calc(100dvh-100px)] lg:grid-cols-2 lg:overflow-hidden">
        {/* Left panel */}
        <section className="relative flex min-h-0 flex-col justify-center overflow-hidden px-6 py-8 sm:px-10 lg:px-12 lg:py-6">
          <div className="relative z-10 mx-auto w-full max-w-[510px] lg:mx-0">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-3 py-1.5 text-xs font-semibold text-cyan-400">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              {t.console}
            </div>

            <h1 className="max-w-[500px] text-3xl font-bold leading-[1.15] tracking-[-0.035em] text-slate-100 sm:text-4xl xl:text-[40px]">
              {t.headline}
            </h1>

            <p className="mt-4 max-w-[465px] text-sm leading-6 text-slate-300 sm:text-[15px] sm:leading-[1.7]">
              {t.description}
            </p>

            <div className="mt-6 space-y-3">
              <Feature icon={FiFileText}>
                {t.features[0]}
              </Feature>

              <Feature icon={FiCalendar}>
                {t.features[1]}
              </Feature>

              <Feature icon={FiShield}>
                {t.features[2]}
              </Feature>
            </div>
          </div>

          <DecorativeGraph />

          <div className="relative z-10 mx-auto mt-8 w-full max-w-[510px] text-xs text-slate-400 lg:absolute lg:bottom-6 lg:left-12 lg:mx-0 lg:mt-0 lg:w-auto">
            We Care NGO <span className="mx-2 text-slate-600">•</span>
            Cairo, Egypt
          </div>
        </section>

        {/* Right panel */}
        <section className="flex min-h-0 items-center justify-center border-t border-white/[0.04] px-5 py-8 sm:px-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-5">
          <LoginCard t={t} language={language} />
        </section>
      </div>
    </main>
  );
}
