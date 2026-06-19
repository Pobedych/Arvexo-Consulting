import { CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/SectionTitle";
import { auditOutput } from "@/data/siteContent";

export function AuditOutputSection() {
  return (
    <section id="audit-output" className="bg-canvas py-16 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionTitle
          eyebrow="AI-аудит"
          title="Что вы получаете после AI-аудита"
          subtitle="Аудит нужен не ради отчёта, а чтобы понять, где AI действительно окупится и какое решение стоит запускать первым."
        />
        <div className="rounded-[28px] border border-line bg-white p-6 shadow-soft sm:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {auditOutput.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-paper p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-sm font-semibold leading-6 text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
