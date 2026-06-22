type Status = string;

const CONFIG: Record<string, { label: string; classes: string }> = {
  // Business statuses
  new:          { label: "Новая",           classes: "bg-blue-50 text-blue-700" },
  contacted:    { label: "Связались",       classes: "bg-violet-50 text-violet-700" },
  in_progress:  { label: "В работе",        classes: "bg-amber-50 text-amber-700" },
  done:         { label: "Выполнена",       classes: "bg-success/10 text-success" },
  rejected:     { label: "Отклонена",       classes: "bg-surface-alt text-muted" },
  // Telegram delivery statuses (fallback)
  sent:         { label: "Отправлена",      classes: "bg-success/10 text-success" },
  pending:      { label: "В обработке",     classes: "bg-amber-50 text-amber-700" },
  failed:       { label: "Ошибка отправки", classes: "bg-accent/10 text-accent" },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status] ?? { label: status, classes: "bg-surface-alt text-muted" };
  return (
    <span className={`inline-flex shrink-0 items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
