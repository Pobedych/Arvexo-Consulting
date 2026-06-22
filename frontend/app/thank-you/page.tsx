import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Заявка принята — Arvexo AI Consulting",
  robots: { index: false },
};

const STEPS = [
  {
    n: "01",
    title: "Анализ задачи",
    body: "Мы изучим описание и подберём подходящий формат решения: аудит, бот, ассистент или интеграция.",
  },
  {
    n: "02",
    title: "Связь в течение 24 часов",
    body: "Напишем или позвоним по указанному контакту, чтобы уточнить детали и назначить звонок.",
  },
  {
    n: "03",
    title: "Коммерческое предложение",
    body: "После звонка подготовим КП с описанием решения, сроками и стоимостью.",
  },
];

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-5 py-20">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
          <svg className="h-8 w-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Заявка принята</h1>
        <p className="mt-3 text-base text-muted">
          Спасибо! Мы получили вашу заявку и скоро выйдем на связь.
        </p>

        {/* Steps */}
        <div className="mt-12 space-y-4 text-left">
          {STEPS.map(({ n, title, body }) => (
            <div
              key={n}
              className="flex gap-4 rounded-card2 border border-hairline bg-surface p-5"
            >
              <span className="mt-0.5 shrink-0 font-mono text-xs font-medium text-faint">{n}</span>
              <div>
                <p className="font-semibold text-ink">{title}</p>
                <p className="mt-1 text-sm text-muted">{body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Следить за статусом заявки →
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-muted transition hover:text-ink"
          >
            На главную
          </Link>
        </div>
      </div>
    </main>
  );
}
