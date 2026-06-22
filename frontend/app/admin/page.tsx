"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { StatusBadge } from "@/components/account/StatusBadge";
import { StatusSelect } from "@/components/account/StatusSelect";
import {
  type AdminLeadItem,
  type LeadStatus,
  getAdminLeads,
  updateLeadStatus,
} from "@/lib/auth";

const STATUSES: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all",         label: "Все" },
  { value: "new",         label: "Новые" },
  { value: "contacted",   label: "Связались" },
  { value: "in_progress", label: "В работе" },
  { value: "done",        label: "Выполнено" },
  { value: "rejected",    label: "Отклонено" },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<AdminLeadItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/"); return; }

    getAdminLeads().then((data) => {
      if (data === null) { router.replace("/"); return; }
      setLeads(data);
      setPageLoading(false);
    });
  }, [loading, user, router]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    setUpdating(id);
    const ok = await updateLeadStatus(id, status);
    if (ok) {
      setLeads((prev) =>
        prev.map((l) => (l.id === id ? { ...l, status } : l))
      );
    }
    setUpdating(null);
  };

  if (loading || pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const visible = filter === "all" ? leads : leads.filter((l) => l.status === filter);

  const counts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.status] = (acc[l.status] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-10 border-b border-hairline bg-surface/90 backdrop-blur-xl">
        <div className="section-shell flex h-[var(--header-height)] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-muted hover:text-ink">← Arvexo AI</Link>
            <span className="text-hairline-md">·</span>
            <h1 className="text-sm font-semibold text-ink">Admin</h1>
          </div>
          <span className="text-xs text-muted">{leads.length} заявок</span>
        </div>
      </header>

      <div className="section-shell py-6">
        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STATUSES.filter((s) => s.value !== "all").map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-card2 border p-4 text-left transition ${
                filter === value
                  ? "border-ink bg-surface"
                  : "border-hairline bg-surface hover:border-hairline-md"
              }`}
            >
              <p className="text-2xl font-semibold text-ink">{counts[value] ?? 0}</p>
              <p className="mt-0.5 text-xs text-muted">{label}</p>
            </button>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="mb-5 flex flex-wrap gap-1">
          {STATUSES.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-pill px-3 py-1.5 text-xs font-medium transition ${
                filter === value
                  ? "bg-ink text-bg"
                  : "bg-surface text-muted hover:text-ink border border-hairline"
              }`}
            >
              {label}
              {value !== "all" && (counts[value] ?? 0) > 0 && (
                <span className="ml-1.5 opacity-60">{counts[value]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Leads list */}
        {visible.length === 0 ? (
          <div className="rounded-card2 border border-hairline bg-surface py-16 text-center text-sm text-muted">
            Нет заявок с таким статусом
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((lead) => (
              <div
                key={lead.id}
                className="rounded-card2 border border-hairline bg-surface transition hover:border-hairline-md"
              >
                {/* Main row */}
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  {/* Left: info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-ink">{lead.name}</span>
                      {lead.company && (
                        <span className="text-xs text-muted">· {lead.company}</span>
                      )}
                      <StatusBadge status={lead.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">{lead.contact}</p>
                    <p
                      className={`mt-2 text-sm text-ink ${expanded === lead.id ? "" : "line-clamp-2"}`}
                    >
                      {lead.task}
                    </p>
                    {lead.task.length > 120 && (
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === lead.id ? null : lead.id)}
                        className="mt-1 text-xs text-accent hover:underline"
                      >
                        {expanded === lead.id ? "Свернуть" : "Читать полностью"}
                      </button>
                    )}
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                      <span>{formatDate(lead.created_at)}</span>
                      {lead.budget && <span>{lead.budget}</span>}
                    </div>
                  </div>

                  {/* Right: status selector */}
                  <div className="shrink-0">
                    <StatusSelect
                      value={lead.status as LeadStatus}
                      disabled={updating === lead.id}
                      onChange={(status) => handleStatusChange(lead.id, status)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
