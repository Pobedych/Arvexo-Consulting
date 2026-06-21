"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { buildSSOLoginUrl, getMyLeads, logout, type LeadListItem } from "@/lib/auth";

const STATUS_LABELS: Record<string, string> = {
  sent: "Отправлена",
  failed: "Ошибка отправки",
  pending: "В обработке",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AccountPage() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;
    getMyLeads().then((data) => {
      if (cancelled) return;
      setLeads(data);
      setLeadsLoading(false);
    });
    return () => { cancelled = true; };
  }, [loading, user]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
        <h1 className="text-2xl font-semibold text-ink">Войдите в аккаунт</h1>
        <p className="text-muted">Чтобы просмотреть личный кабинет, войдите через Arvexo Account.</p>
        <a
          href={buildSSOLoginUrl()}
          className="inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-bg transition hover:opacity-90"
        >
          Войти через Arvexo Account
        </a>
        <Link href="/" className="text-sm text-muted hover:text-ink">
          ← На главную
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="section-shell py-16">
        <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
          ← Arvexo AI
        </Link>

        <div className="mb-10 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-ink">
              {user.name ?? "Аккаунт"}
            </h1>
            {user.email && (
              <p className="mt-1 text-sm text-muted">{user.email}</p>
            )}
          </div>
          <button
            onClick={async () => {
              await logout();
              await refresh();
              router.push("/");
            }}
            className="shrink-0 rounded-pill border border-hairline px-4 py-2 text-sm font-medium text-muted transition hover:border-ink/30 hover:text-ink"
          >
            Выйти
          </button>
        </div>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-ink">Мои заявки</h2>

          {leadsLoading ? (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div key={n} className="h-20 animate-pulse rounded-xl bg-surface" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="rounded-xl border border-hairline bg-surface px-6 py-10 text-center">
              <p className="text-muted">У вас ещё нет заявок.</p>
              <Link
                href="/#contact"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                Оставить заявку →
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-hairline bg-surface p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="line-clamp-2 flex-1 text-sm text-ink">{lead.task}</p>
                    <span className="shrink-0 text-xs text-muted">
                      {STATUS_LABELS[lead.telegram_status] ?? lead.telegram_status}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-xs text-muted">
                    <span>{formatDate(lead.created_at)}</span>
                    {lead.budget && <span>{lead.budget}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
