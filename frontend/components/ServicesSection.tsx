import { Check } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Reveal";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { services } from "@/data/siteContent";

export function ServicesSection() {
  return (
    <section id="services" className="bg-bg py-20 sm:py-28">
      <div className="section-shell">
        <FadeUp>
          <SectionTitle
            counter="(02)"
            eyebrow="Услуги"
            title="Что мы внедряем"
            subtitle="От короткого AI-аудита до полноценного MVP с интеграциями в ваши сервисы."
          />
        </FadeUp>
        <StaggerGrid className="mt-10 grid gap-4 lg:grid-cols-2">
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <Card className="p-7">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-card border border-hairline bg-bg text-accent">
                    <service.icon size={20} strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] text-ink">{service.title}</h3>
                    <p className="mt-2.5 text-sm leading-7 text-muted">{service.text}</p>
                  </div>
                </div>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
                      <Check size={15} className="shrink-0 text-success" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
