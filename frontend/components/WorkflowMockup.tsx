import { CheckCircle2, CircleDot, Sparkles } from "lucide-react";
import { heroWorkflow, trustPoints } from "@/data/siteContent";

export function WorkflowMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[500px] rounded-[28px] border border-line bg-white p-5 shadow-soft">
      <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-full bg-blue-100 blur-2xl sm:block" />
      <div className="relative rounded-[22px] border border-line bg-paper p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">AI workflow</p>
            <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-ink">Обработка заявки</h3>
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-white">
            <Sparkles size={20} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {heroWorkflow.map((step, index) => (
            <div key={step} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-accent">
                {index === heroWorkflow.length - 1 ? (
                  <CheckCircle2 size={18} aria-hidden="true" />
                ) : (
                  <CircleDot size={18} aria-hidden="true" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{step}</p>
                <p className="text-xs text-muted">{index + 1} этап автоматизации</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.label} className="rounded-2xl bg-white p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{point.label}</p>
              <p className="mt-1 text-sm font-semibold text-ink">{point.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
