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
        className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-[68px] rounded-[24px] border border-line bg-white p-4 shadow-soft">
          <nav className="grid gap-1" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="focus-ring rounded-2xl px-4 py-3 text-sm font-medium text-muted hover:bg-paper hover:text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Button href="#contact" className="mt-3 w-full" onClick={() => setOpen(false)}>
            Обсудить проект
          </Button>
        </div>
      ) : null}
    </div>
  );
}
