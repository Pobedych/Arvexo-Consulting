"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, FileText, LogOut, User } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";
import { AccountAvatar } from "@/components/account/AccountAvatar";
import { StatusBadge } from "@/components/account/StatusBadge";
import { buildSSOLoginUrl, getMyLeads, logout, type LeadListItem } from "@/lib/auth";

type Section = "overview" | "leads";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ─── Unauthenticated ─────────────────────────────────────────────────────────

function UnauthenticatedView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface border border-hairline text-muted">
        <User size={28} />
      </div>
      <div>
        <h1 className="text-2xl font-semibold text-ink">Войдите в аккаунт</h1>
        <p className="mt-2 text-sm text-muted">Чтобы просмотреть личный кабинет, войдите через Arvexo Account.</p>
      </div>
      <a
        href={buildSSOLoginUrl()}
        className="inline-flex items-center gap-2 rounded-pill bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Войти через Arvexo Account
      </a>
      <Link href="/" className="text-sm text-muted hover:text-ink">
        ← На главную
      </Link>
    </div>
  );
}

// ─── Lead card ────────────────────────────────────────────────────────────────

function LeadCard({ lead }: { lead: LeadListItem }) {
  return (
    <div className="rounded-card2 border border-hairline bg-surface p-5 transition hover:border-hairline-md">
      <div className="flex items-start justify-between gap-3">
        <p className="flex-1 text-sm font-medium leading-6 text-ink line-clamp-2">{lead.task}</p>
        <StatusBadge status={lead.telegram_status} />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
        <span>{formatDate(lead.created_at)}</span>
        {lead.budget && (
          <span className="rounded-pill bg-surface-alt px-2 py-0.5 font-medium text-ink">{lead.budget}</span>
        )}
      </div>
    </div>
  );
}

// ─── Content sections ─────────────────────────────────────────────────────────

function OverviewSection({ user }: { user: { name: string | null; email: string | null; id: string } }) {
  return (
    <div className="rounded-card2 border border-hairline bg-surface p-6">
      <h2 className="mb-4 text-base font-semibold text-ink">Личная информация</h2>
      <div className="grid gap-3">
        {[
          { label: "Имя",     value: user.name  ?? "—" },
          { label: "Email",   value: user.email ?? "—" },
          { label: "ID",      value: user.id },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:gap-6">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{label}</span>
            <span className="text-sm text-ink break-all">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeadsSection({ leads, loading }: { leads: LeadListItem[]; loading: boolean }) {
  return (
    <div>
      <h2 className="mb-4 text-base font-semibold text-ink">Мои заявки</h2>
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((n) => (
            <div key={n} className="h-24 animate-pulse rounded-card2 bg-surface border border-hairline" />
          ))}
        </div>
      ) : leads.length === 0 ? (
        <div className="rounded-card2 border border-hairline bg-surface px-6 py-10 text-center">
          <FileText size={32} className="mx-auto mb-3 text-faint" />
          <p className="text-sm text-muted">У вас ещё нет заявок.</p>
          <Link
            href="/#contact"
            className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
          >
            Оставить заявку →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => <LeadCard key={lead.id} lead={lead} />)}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { user, loading, refresh } = useAuth();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<Section>("overview");
  const [leads, setLeads] = useState<LeadListItem[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const overviewRef = useRef<HTMLDivElement>(null);
  const leadsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading || !user) return;
    let cancelled = false;
    getMyLeads().then((data) => {
      if (!cancelled) { setLeads(data); setLeadsLoading(false); }
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

  if (!user) return <UnauthenticatedView />;

  const scrollTo = (section: Section) => {
    setActiveSection(section);
    const el = section === "overview" ? overviewRef.current : leadsRef.current;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLogout = async () => {
    await logout();
    await refresh();
    router.push("/");
  };

  const navLinks: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Обзор",       icon: <User size={16} /> },
    { id: "leads",    label: "Мои заявки",  icon: <FileText size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* ── Mobile: profile card ──────────────────────────── */}
      <div className="lg:hidden">
        <div className="border-b border-hairline bg-surface">
          <div className="section-shell py-5">
            <Link href="/" className="mb-5 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
              ← Arvexo AI
            </Link>

            <div className="flex items-center gap-4">
              <AccountAvatar name={user.name} size="lg" />
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold text-ink">{user.name ?? "Аккаунт"}</p>
                {user.email && <p className="truncate text-sm text-muted">{user.email}</p>}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="https://account.arvexo.ru"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-pill border border-hairline px-4 py-2 text-sm font-medium text-muted transition hover:border-hairline-md hover:text-ink"
              >
                Arvexo Account <ExternalLink size={13} />
              </a>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-pill border border-hairline px-4 py-2 text-sm font-medium text-muted transition hover:border-hairline-md hover:text-ink"
              >
                <LogOut size={14} /> Выйти
              </button>
            </div>
          </div>
        </div>

        {/* Mobile nav tabs */}
        <div className="sticky top-[var(--header-height)] z-10 border-b border-hairline bg-bg/90 backdrop-blur-xl">
          <div className="section-shell flex gap-0">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeSection === id
                    ? "border-ink text-ink"
                    : "border-transparent text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile content */}
        <div className="section-shell space-y-8 py-6">
          <div ref={overviewRef} style={{ scrollMarginTop: "120px" }}>
            <OverviewSection user={user} />
          </div>
          <div ref={leadsRef} style={{ scrollMarginTop: "120px" }}>
            <LeadsSection leads={leads} loading={leadsLoading} />
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Оставить новую заявку →
          </Link>
        </div>
      </div>

      {/* ── Desktop: sidebar layout ───────────────────────── */}
      <div className="hidden lg:flex min-h-screen">
        {/* Sidebar */}
        <aside className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-hairline bg-surface px-6 py-8 flex flex-col">
          <Link href="/" className="mb-8 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
            ← Arvexo AI
          </Link>

          {/* Profile */}
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <AccountAvatar name={user.name} size="lg" />
            <div>
              <p className="text-lg font-semibold text-ink">{user.name ?? "Аккаунт"}</p>
              {user.email && <p className="mt-0.5 text-sm text-muted">{user.email}</p>}
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-1">
            {navLinks.map(({ id, label, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-3 rounded-card px-4 py-3 text-sm font-medium transition text-left ${
                  activeSection === id
                    ? "bg-accent/8 text-accent"
                    : "text-muted hover:bg-bg hover:text-ink"
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </nav>

          {/* Bottom links */}
          <div className="mt-auto flex flex-col gap-1 pt-8 border-t border-hairline">
            <a
              href="https://account.arvexo.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
            >
              <ExternalLink size={16} />
              Arvexo Account
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
            >
              <LogOut size={16} />
              Выйти
            </button>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-8 py-10 space-y-10">
            <div>
              <h1 className="text-2xl font-semibold text-ink">
                Добро пожаловать, {user.name?.split(" ")[0] ?? "в кабинет"}
              </h1>
              <p className="mt-1 text-sm text-muted">Управляйте аккаунтом и просматривайте заявки.</p>
            </div>

            <div ref={overviewRef} style={{ scrollMarginTop: "40px" }}>
              <OverviewSection user={user} />
            </div>

            <div ref={leadsRef} style={{ scrollMarginTop: "40px" }}>
              <LeadsSection leads={leads} loading={leadsLoading} />
              {!leadsLoading && (
                <Link
                  href="/#contact"
                  className="mt-4 inline-flex items-center gap-2 rounded-pill bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Оставить новую заявку →
                </Link>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
