import { CheckCircle2 } from "lucide-react";
import { FadeUp, StaggerGrid, StaggerItem } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { auditOutput } from "@/data/siteContent";

export function AuditOutputSection() {
  return (
    <section id="audit-output" className="bg-surface-alt py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <FadeUp>
          <SectionTitle
            counter="(07)"
            eyebrow="AI-аудит"
            title="Что вы получаете после AI-аудита"
            subtitle="Аудит нужен не ради отчёта, а чтобы понять, где AI действительно окупится и какое решение стоит запускать первым."
          />
        </FadeUp>
        <div className="rounded-card2 border border-hairline bg-surface p-6 shadow-soft sm:p-8">
          <StaggerGrid className="grid gap-2.5 sm:grid-cols-2">
            {auditOutput.map((item) => (
              <StaggerItem key={item}>
                <div className="flex items-start gap-3 rounded-card border border-hairline bg-bg px-4 py-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-ink">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </div>
    </section>
  );
}
