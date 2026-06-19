import { SectionTitle } from "@/components/SectionTitle";
import { processSteps } from "@/data/siteContent";

export function ProcessSection() {
  return (
    <section id="process" className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <SectionTitle eyebrow="Процесс" title="От идеи до рабочего AI-решения" align="center" />
        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {processSteps.map((step, index) => (
            <div key={step.title} className="rounded-[24px] border border-line bg-white p-6 shadow-card">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-[-0.02em] text-ink">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
