import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { solutions } from "@/data/siteContent";

export function SolutionsSection() {
  return (
    <section id="solutions" className="bg-canvas py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Решения"
          title="Практические сценарии, с которых можно начать"
          subtitle="Не обязательно перестраивать весь бизнес сразу. Часто первый результат даёт автоматизация одного повторяемого процесса."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item) => (
            <Card key={item.title}>
              <item.icon className="h-8 w-8 text-accent" strokeWidth={1.8} aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
