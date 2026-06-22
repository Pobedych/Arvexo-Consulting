import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cases } from "@/data/siteContent";

export const metadata: Metadata = {
  title: "Кейсы — Arvexo AI Consulting",
  description: "Реальные примеры внедрения AI: боты, ассистенты, автоматизация и интеграции для бизнеса.",
  openGraph: {
    title: "Кейсы — Arvexo AI Consulting",
    description: "Реальные примеры внедрения AI в бизнес.",
    url: "https://ai.arvexo.ru/cases",
  },
};

export default function CasesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg">
        {/* Hero */}
        <section className="section-shell py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="mono-label mb-4">Кейсы</p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Реальные результаты<br />
              <span className="text-muted">для реальных бизнесов</span>
            </h1>
            <p className="mt-5 text-lg text-muted">
              Примеры задач, которые мы решили с помощью AI-инструментов.
              Без воды — только проблема, решение и измеримый результат.
            </p>
          </div>
        </section>

        {/* Cases grid */}
        <section className="section-shell pb-24">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <article
                key={c.id}
                className="flex flex-col rounded-card2 border border-hairline bg-surface p-6 transition hover:border-hairline-md hover:shadow-sm"
              >
                {/* Top: industry + tag */}
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-muted">{c.industry}</span>
                  <span className="rounded-pill bg-surface-alt px-2.5 py-0.5 text-xs font-medium text-ink">
                    {c.tag}
                  </span>
                </div>

                {/* Metric */}
                <div className="mb-4 flex items-end gap-2">
                  <span className="font-cormorant text-5xl font-semibold leading-none text-accent">
                    {c.metric}
                  </span>
                  <span className="mb-1 text-sm text-muted">{c.metricLabel}</span>
                </div>

                <h2 className="mb-3 text-base font-semibold leading-snug text-ink">{c.title}</h2>

                {/* Problem */}
                <div className="mb-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-faint">Задача</p>
                  <p className="text-sm text-muted">{c.problem}</p>
                </div>

                {/* Solution */}
                <div className="mb-3">
                  <p className="mb-1 text-xs font-medium uppercase tracking-wide text-faint">Решение</p>
                  <p className="text-sm text-muted">{c.solution}</p>
                </div>

                {/* Result */}
                <div className="mt-auto pt-4 border-t border-hairline">
                  <p className="text-sm font-medium text-ink">{c.result}</p>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-card2 border border-hairline bg-surface p-8 text-center sm:p-12">
            <h2 className="text-2xl font-semibold text-ink sm:text-3xl">
              Хотите похожий результат?
            </h2>
            <p className="mt-3 text-muted">
              Расскажите о своей задаче — подберём подходящее решение и оценим потенциальный эффект.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center gap-2 rounded-pill bg-accent px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              Обсудить задачу →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
