import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { WorkflowMockup } from "@/components/WorkflowMockup";
import { microcopy } from "@/data/siteContent";

export function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-b from-canvas to-paper py-16 sm:py-20 lg:py-24">
      <div className="section-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-accent shadow-sm">
            AI-аудит и внедрение автоматизации
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
            AI-консалтинг и автоматизация для бизнеса
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
            Помогаем компаниям внедрять AI в продажи, поддержку, аналитику и внутренние процессы: от аудита и
            прототипа до полноценной интеграции.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" className="gap-2">
              Обсудить проект <ArrowRight size={18} aria-hidden="true" />
            </Button>
            <Button href="#services" variant="secondary">
              Посмотреть услуги
            </Button>
          </div>
          <p className="mt-7 max-w-2xl text-sm leading-6 text-muted">{microcopy}</p>
        </div>
        <WorkflowMockup />
      </div>
    </section>
  );
}
