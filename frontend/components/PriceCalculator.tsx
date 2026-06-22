"use client";

import Link from "next/link";
import { useState } from "react";

type ServiceKey = "audit" | "bot" | "assistant" | "integration" | "complex";
type ScaleKey = "small" | "medium" | "enterprise";
type UrgencyKey = "standard" | "urgent";

const SERVICES: { key: ServiceKey; label: string; desc: string; base: [number, number] }[] = [
  { key: "audit",       label: "AI-аудит",          desc: "Анализ процессов и карта автоматизации",  base: [30_000, 80_000] },
  { key: "bot",         label: "Telegram-бот",       desc: "Бот для продаж, поддержки или заявок",   base: [50_000, 150_000] },
  { key: "assistant",   label: "AI-ассистент",       desc: "Внутренний ассистент на базе знаний",    base: [80_000, 200_000] },
  { key: "integration", label: "CRM-интеграция",     desc: "Подключение AI к CRM, таблицам, API",    base: [60_000, 180_000] },
  { key: "complex",     label: "Комплексный проект", desc: "Несколько направлений под ключ",         base: [120_000, 350_000] },
];

const SCALES: { key: ScaleKey; label: string; multiplier: number }[] = [
  { key: "small",      label: "Малый бизнес",    multiplier: 1.0 },
  { key: "medium",     label: "Средний бизнес",  multiplier: 1.4 },
  { key: "enterprise", label: "Корпоративный",   multiplier: 2.0 },
];

const URGENCIES: { key: UrgencyKey; label: string; multiplier: number }[] = [
  { key: "standard", label: "Стандартно",    multiplier: 1.0 },
  { key: "urgent",   label: "Срочно (+30%)", multiplier: 1.3 },
];

function fmt(n: number) {
  return new Intl.NumberFormat("ru-RU").format(Math.round(n / 1000) * 1000);
}

function ChoiceGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: T; label: string; desc?: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            title={opt.desc}
            className={`rounded-pill border px-4 py-2 text-sm font-medium transition-all ${
              value === opt.key
                ? "border-accent bg-accent text-white"
                : "border-hairline bg-surface text-muted hover:border-hairline-md hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function PriceCalculator() {
  const [service, setService]   = useState<ServiceKey>("bot");
  const [scale, setScale]       = useState<ScaleKey>("small");
  const [urgency, setUrgency]   = useState<UrgencyKey>("standard");

  const base = SERVICES.find((s) => s.key === service)!.base;
  const sm = SCALES.find((s) => s.key === scale)!.multiplier;
  const um = URGENCIES.find((u) => u.key === urgency)!.multiplier;

  const lo = base[0] * sm * um;
  const hi = base[1] * sm * um;

  return (
    <section id="calculator" className="py-20 lg:py-28">
      <div className="section-shell">
        <div className="mb-10 text-center">
          <p className="mono-label mb-3">Калькулятор</p>
          <h2 className="text-3xl font-semibold text-ink sm:text-4xl">Сколько стоит ваш проект?</h2>
          <p className="mt-3 text-muted">
            Выберите параметры — получите ориентировочный диапазон стоимости.
          </p>
        </div>

        <div className="mx-auto max-w-2xl rounded-card2 border border-hairline bg-surface p-6 sm:p-8 space-y-7">
          <ChoiceGroup
            label="Тип задачи"
            options={SERVICES}
            value={service}
            onChange={setService}
          />
          <ChoiceGroup
            label="Масштаб бизнеса"
            options={SCALES}
            value={scale}
            onChange={setScale}
          />
          <ChoiceGroup
            label="Срочность"
            options={URGENCIES}
            value={urgency}
            onChange={setUrgency}
          />

          {/* Result */}
          <div className="rounded-card2 border border-hairline bg-bg px-6 py-5">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
              Ориентировочная стоимость
            </p>
            <p className="mt-2 text-3xl font-semibold text-ink">
              от {fmt(lo)} до {fmt(hi)} ₽
            </p>
            <p className="mt-1 text-xs text-muted">
              Точная цена зависит от деталей задачи. Первичная консультация бесплатна.
            </p>
          </div>

          <Link
            href="/#contact"
            className="block w-full rounded-pill bg-accent py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
          >
            Получить точный расчёт →
          </Link>
        </div>
      </div>
    </section>
  );
}
