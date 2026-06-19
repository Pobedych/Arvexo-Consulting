import Link from "next/link";
import { Button } from "@/components/Button";
import { MobileMenu } from "@/components/MobileMenu";
import { navItems } from "@/data/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-canvas/90 backdrop-blur-xl">
      <div className="section-shell flex h-[var(--header-height)] items-center justify-between">
        <Link href="/" className="focus-ring rounded-full text-lg font-semibold tracking-[-0.03em] text-ink">
          Arvexo <span className="text-accent">AI</span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-4 py-2 text-sm font-medium text-muted transition hover:bg-white hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button href="#contact">Обсудить проект</Button>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
}
