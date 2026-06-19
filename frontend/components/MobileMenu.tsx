"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { navItems } from "@/data/siteContent";
import { Button } from "@/components/Button";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

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

      {open ? (
        <div className="absolute left-4 right-4 top-[68px] rounded-card2 border border-hairline bg-surface p-4 shadow-panel">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="https://account.arvexo.ru"
              className="focus-ring rounded-card px-4 py-3 text-sm font-medium text-muted transition hover:bg-bg hover:text-ink"
              onClick={() => setOpen(false)}
            >
              Войти
            </Link>
          </nav>
          <Button href="#contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Обсудить проект
          </Button>
        </div>
      ) : null}
    </div>
  );
}
