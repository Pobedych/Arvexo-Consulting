"use client";

import { useEffect, useRef, useState } from "react";
import type { LeadStatus } from "@/lib/auth";

const OPTIONS: { value: LeadStatus; label: string; dot: string }[] = [
  { value: "new",         label: "Новая",       dot: "bg-blue-500" },
  { value: "contacted",   label: "Связались",   dot: "bg-violet-500" },
  { value: "in_progress", label: "В работе",    dot: "bg-amber-500" },
  { value: "done",        label: "Выполнена",   dot: "bg-[var(--success)]" },
  { value: "rejected",    label: "Отклонена",   dot: "bg-[var(--text-faint)]" },
];

type Props = {
  value: LeadStatus;
  disabled?: boolean;
  onChange: (value: LeadStatus) => void;
};

export function StatusSelect({ value, disabled, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = OPTIONS.find((o) => o.value === value) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-card border border-hairline bg-surface px-3 py-2 text-sm text-ink transition hover:border-hairline-md focus:outline-none disabled:opacity-50"
      >
        <span className={`h-2 w-2 rounded-full shrink-0 ${current.dot}`} />
        <span className="min-w-[90px] text-left">{current.label}</span>
        <svg
          className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[160px] overflow-hidden rounded-card border border-hairline bg-surface shadow-lg">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-sm transition hover:bg-bg ${
                opt.value === value ? "font-medium text-ink" : "text-muted"
              }`}
            >
              <span className={`h-2 w-2 rounded-full shrink-0 ${opt.dot}`} />
              {opt.label}
              {opt.value === value && (
                <svg className="ml-auto h-3.5 w-3.5 text-ink" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l4 4 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
