import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { audiences } from "@/data/siteContent";

export function AudienceSection() {
  return (
    <section className="bg-bg py-20 sm:py-28">
      <div className="section-shell">
        <FadeUp>
          <SectionTitle
            counter="(06)"
            eyebrow="Для кого"
            title="Кому особенно полезна AI-автоматизация"
            subtitle="Подбираем решение под реальный процесс: продажи, поддержку, экспертные услуги или внутреннюю операционку."
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {audiences.map((item) => (
            <StaggerItem key={item.title}>
              <Card>
                <item.icon className="h-7 w-7 text-accent" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-5 text-[1.05rem] font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-7 text-muted">{item.text}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
