import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { audiences } from "@/data/siteContent";

export function AudienceSection() {
  return (
    <section className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Для кого"
          title="Кому особенно полезна AI-автоматизация"
          subtitle="Подбираем решение под реальный процесс: продажи, поддержку, экспертные услуги или внутреннюю операционку."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
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
