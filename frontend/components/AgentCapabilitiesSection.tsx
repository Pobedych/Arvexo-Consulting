import { Card } from "@/components/Card";
import { SectionTitle } from "@/components/SectionTitle";
import { capabilities } from "@/data/siteContent";

export function AgentCapabilitiesSection() {
  return (
    <section id="agents" className="bg-canvas py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionTitle
            eyebrow="AI workflows"
            title="AI-агенты под конкретные задачи бизнеса"
            subtitle="Собираем AI-решения не как один универсальный чат, а как систему с отдельными возможностями: поиск информации, анализ данных, обработка заявок, генерация ответов и интеграции с сервисами."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {capabilities.map((item, index) => (
              <Card key={item.title} className={index === capabilities.length - 1 ? "sm:col-span-2" : ""}>
                <item.icon className="h-8 w-8 text-accent" strokeWidth={1.8} aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
