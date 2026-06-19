import { Check } from "lucide-react";
import { benefits } from "@/data/siteContent";

export function WhyArvexoSection() {
  return (
    <section id="why" className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 rounded-[28px] border border-line bg-white p-7 shadow-soft sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Почему Arvexo</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-ink sm:text-5xl">
              Без магии, воды и “AI ради AI”
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted">
              Мы не продаём абстрактную цифровую трансформацию. Мы разбираем конкретный процесс, проектируем решение,
              разрабатываем прототип и внедряем его в реальную работу бизнеса.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-start gap-3 rounded-2xl bg-paper p-4">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm font-semibold leading-6 text-ink">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
