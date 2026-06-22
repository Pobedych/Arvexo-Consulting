"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { navItems } from "@/data/siteContent";
import { Button } from "@/components/Button";
import { useAuth } from "@/components/AuthProvider";
import { buildSSOLoginUrl, logout } from "@/lib/auth";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-pill border border-hairline bg-surface text-ink"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
      </button>

      {open && (
        <div className="absolute left-4 right-4 top-[68px] z-50 rounded-card2 border border-hairline bg-surface p-4 shadow-panel">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-2 grid gap-1 border-t border-hairline pt-3">
            {loading ? (
              <div className="h-11 animate-pulse rounded-card bg-bg" />
            ) : user ? (
              <>
                <Link
                  href="/account"
                  className="focus-ring flex items-center gap-3 rounded-card px-4 py-3 text-sm font-medium text-ink transition hover:bg-bg"
                  onClick={close}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
                    {(user.name ?? user.email ?? "A")[0].toUpperCase()}
                  </span>
                  {user.name ?? user.email ?? "Аккаунт"}
                </Link>
                <button
                  type="button"
                  className="focus-ring rounded-card px-4 py-3 text-left text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
                  onClick={async () => {
                    await logout();
                    router.refresh();
                    close();
                  }}
                >
                  Выйти
                </button>
              </>
            ) : (
              <a
                href={buildSSOLoginUrl()}
                className="focus-ring rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
                onClick={close}
              >
                Войти
              </a>
            )}
          </div>

          <Button href="#contact" className="mt-3 w-full" onClick={close}>
            Обсудить проект
          </Button>
        </div>
      )}
    </div>
  );
}
