import type { LeadStatus } from "@/lib/auth";

const STEPS: { key: LeadStatus | "new"; label: string }[] = [
  { key: "new",         label: "Получена" },
  { key: "contacted",   label: "Связались" },
  { key: "in_progress", label: "В работе" },
  { key: "done",        label: "Выполнена" },
];

const ORDER: Record<string, number> = {
  new: 0,
  contacted: 1,
  in_progress: 2,
  done: 3,
  rejected: 3,
};

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

type Props = {
  status: string;
  createdAt: string;
  statusUpdatedAt: string | null;
};

export function LeadTimeline({ status, createdAt, statusUpdatedAt }: Props) {
  const currentOrder = ORDER[status] ?? 0;
  const isRejected = status === "rejected";

  if (isRejected) {
    return (
      <div className="mt-3 flex items-center gap-2 text-xs text-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-faint)]" />
        <span>Заявка отклонена</span>
        {statusUpdatedAt && <span>· {fmt(statusUpdatedAt)}</span>}
      </div>
    );
  }

  return (
    <div className="mt-4 flex items-start gap-0">
      {STEPS.map(({ key, label }, idx) => {
        const stepOrder = ORDER[key] ?? idx;
        const done = stepOrder < currentOrder;
        const active = stepOrder === currentOrder;
        const isLast = idx === STEPS.length - 1;

        return (
          <div key={key} className="flex flex-1 flex-col items-center">
            <div className="flex w-full items-center">
              {/* Left connector */}
              <div
                className={`h-px flex-1 transition-colors ${idx === 0 ? "invisible" : done || active ? "bg-accent" : "bg-hairline"}`}
              />
              {/* Dot */}
              <div
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  active
                    ? "border-accent bg-accent"
                    : done
                    ? "border-accent bg-accent"
                    : "border-hairline-md bg-surface"
                }`}
              >
                {(done || active) && (
                  <svg className="h-2.5 w-2.5 text-white" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 5l2.5 2.5L8 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              {/* Right connector */}
              <div
                className={`h-px flex-1 transition-colors ${isLast ? "invisible" : done ? "bg-accent" : "bg-hairline"}`}
              />
            </div>
            <p className={`mt-1.5 text-center text-[10px] leading-tight ${active ? "font-semibold text-accent" : done ? "text-ink" : "text-muted"}`}>
              {label}
              {active && statusUpdatedAt && key !== "new" && (
                <span className="mt-0.5 block font-normal text-muted">{fmt(statusUpdatedAt)}</span>
              )}
              {key === "new" && (
                <span className="mt-0.5 block font-normal text-muted">{fmt(createdAt)}</span>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}
