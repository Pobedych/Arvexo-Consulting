type Status = "sent" | "pending" | "failed" | string;

const CONFIG: Record<string, { label: string; classes: string }> = {
  sent:    { label: "Отправлена",       classes: "bg-success/10 text-success" },
  pending: { label: "В обработке",      classes: "bg-amber-100 text-amber-700" },
  failed:  { label: "Ошибка отправки",  classes: "bg-accent/10 text-accent" },
};

export function StatusBadge({ status }: { status: Status }) {
  const cfg = CONFIG[status] ?? { label: status, classes: "bg-hairline text-muted" };
  return (
    <span className={`inline-flex items-center rounded-pill px-2.5 py-0.5 text-xs font-medium ${cfg.classes}`}>
      {cfg.label}
    </span>
  );
}
