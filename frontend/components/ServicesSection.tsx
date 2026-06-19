import { Check } from "lucide-react";
import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { services } from "@/data/siteContent";

export function ServicesSection() {
  return (
    <section id="services" className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Услуги"
          title="Что мы внедряем"
          subtitle="От короткого AI-аудита до полноценного MVP с интеграциями в ваши сервисы."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <Card key={service.title} className="p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-accent">
                  <service.icon size={24} strokeWidth={1.8} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-ink">{service.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{service.text}</p>
                </div>
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
                    <Check size={17} className="text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
