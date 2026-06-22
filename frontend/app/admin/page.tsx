"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { StatusBadge } from "@/components/account/StatusBadge";
import { StatusSelect } from "@/components/account/StatusSelect";
import {
  type AdminLeadItem,
  type LeadStatus,
  getAdminLeads,
  updateLeadNotes,
  updateLeadStatus,
} from "@/lib/auth";

function exportToCsv(leads: AdminLeadItem[]) {
  const URGENCY: Record<string, string> = { urgent: "Срочно", standard: "Стандартно" };
  const STATUS: Record<string, string> = {
    new: "Новая", contacted: "Связались", in_progress: "В работе",
    done: "Выполнена", rejected: "Отклонена",
  };
  const headers = ["Дата", "Имя", "Контакт", "Компания", "Тип", "Срочность", "Бюджет", "Статус", "Задача", "Заметка"];
  const rows = leads.map((l) => [
    new Date(l.created_at).toLocaleDateString("ru-RU"),
    l.name, l.contact, l.company ?? "",
    l.service_type ?? "", URGENCY[l.urgency ?? ""] ?? "",
    l.budget ?? "", STATUS[l.status] ?? l.status,
    `"${l.task.replace(/"/g, '""')}"`,
    `"${(l.admin_notes ?? "").replace(/"/g, '""')}"`,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const STATUSES: { value: LeadStatus | "all"; label: string }[] = [
  { value: "all",         label: "Все" },
  { value: "new",         label: "Новые" },
  { value: "contacted",   label: "Связались" },
  { value: "in_progress", label: "В работе" },
  { value: "done",        label: "Выполнено" },
  { value: "rejected",    label: "Отклонено" },
];

const URGENCY_LABELS: Record<string, string> = {
  urgent:   "🔴 Срочно",
  standard: "🟢 Стандартно",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function NotesField({ lead, onSave }: { lead: AdminLeadItem; onSave: (id: string, notes: string) => void }) {
  const [text, setText] = useState(lead.admin_notes ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const save = async (value: string) => {
    setSaving(true);
    await updateLeadNotes(lead.id, value);
    onSave(lead.id, value);
    setSaving(false);
    setSaved(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="border-t border-hairline px-5 py-4">
      <label className="mb-1.5 block text-xs font-medium text-muted">Заметка (только для команды)</label>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Добавьте внутреннюю заметку..."
        className="w-full resize-none rounded-card border border-hairline bg-bg px-3 py-2 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20"
      />
      <div className="mt-2 flex items-center gap-3">
        <button
          type="button"
          disabled={saving || text === (lead.admin_notes ?? "")}
          onClick={() => save(text)}
          className="rounded-pill bg-ink px-3 py-1.5 text-xs font-medium text-bg transition hover:opacity-80 disabled:opacity-40"
        >
          {saving ? "Сохраняем..." : "Сохранить"}
        </button>
        {saved && <span className="text-xs text-success">Сохранено</span>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<AdminLeadItem[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [notesOpen, setNotesOpen] = useState<string | null>(null);

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
    if (ok) setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    setUpdating(null);
  };

  const handleNotesSave = (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, admin_notes: notes || null } : l)));
  };

  if (loading || pageLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  const q = search.trim().toLowerCase();
  const searched = q
    ? leads.filter((l) =>
        l.name.toLowerCase().includes(q) ||
        l.contact.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q) ||
        l.task.toLowerCase().includes(q)
      )
    : leads;
  const visible = filter === "all" ? searched : searched.filter((l) => l.status === filter);
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
            <span className="text-hairline">·</span>
            <h1 className="text-sm font-semibold text-ink">Admin</h1>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Поиск..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 rounded-card border border-hairline bg-bg px-3 text-sm text-ink placeholder:text-faint focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/20 w-40 sm:w-56"
            />
            <button
              type="button"
              onClick={() => exportToCsv(leads)}
              className="flex h-8 items-center gap-1.5 rounded-card border border-hairline bg-bg px-3 text-xs font-medium text-muted transition hover:border-hairline-md hover:text-ink"
            >
              ↓ CSV
            </button>
          </div>
        </div>
      </header>

      <div className="section-shell py-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
          {STATUSES.filter((s) => s.value !== "all").map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-card2 border p-4 text-left transition ${
                filter === value ? "border-ink bg-surface" : "border-hairline bg-surface hover:border-hairline-md"
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
                  : "border border-hairline bg-surface text-muted hover:text-ink"
              }`}
            >
              {label}
              {value !== "all" && (counts[value] ?? 0) > 0 && (
                <span className="ml-1.5 opacity-60">{counts[value]}</span>
              )}
            </button>
          ))}
        </div>

        {/* Leads */}
        {visible.length === 0 ? (
          <div className="rounded-card2 border border-hairline bg-surface py-16 text-center text-sm text-muted">
            Нет заявок с таким статусом
          </div>
        ) : (
          <div className="space-y-3">
            {visible.map((lead) => (
              <div key={lead.id} className="rounded-card2 border border-hairline bg-surface transition hover:border-hairline-md">
                {/* Main row */}
                <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-ink">{lead.name}</span>
                      {lead.company && <span className="text-xs text-muted">· {lead.company}</span>}
                      <StatusBadge status={lead.status} />
                    </div>
                    <p className="mt-1 text-sm text-muted">{lead.contact}</p>

                    {/* Tags row */}
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {lead.service_type && (
                        <span className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs font-medium text-ink">
                          {lead.service_type}
                        </span>
                      )}
                      {lead.urgency && URGENCY_LABELS[lead.urgency] && (
                        <span className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs font-medium text-ink">
                          {URGENCY_LABELS[lead.urgency]}
                        </span>
                      )}
                      {lead.budget && (
                        <span className="rounded-pill bg-surface-alt px-2 py-0.5 text-xs font-medium text-ink">
                          {lead.budget}
                        </span>
                      )}
                    </div>

                    <p className={`mt-2 text-sm text-ink ${expanded === lead.id ? "" : "line-clamp-2"}`}>
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

                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                      <span>{formatDate(lead.created_at)}</span>
                      <button
                        type="button"
                        onClick={() => setNotesOpen(notesOpen === lead.id ? null : lead.id)}
                        className={`flex items-center gap-1 rounded-pill px-2 py-0.5 transition hover:text-ink ${
                          lead.admin_notes ? "text-ink" : "text-muted"
                        }`}
                      >
                        {lead.admin_notes ? "📝 Заметка" : "+ заметка"}
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0">
                    <StatusSelect
                      value={lead.status as LeadStatus}
                      disabled={updating === lead.id}
                      onChange={(status) => handleStatusChange(lead.id, status)}
                    />
                  </div>
                </div>

                {/* Notes panel */}
                {notesOpen === lead.id && (
                  <NotesField lead={lead} onSave={handleNotesSave} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
