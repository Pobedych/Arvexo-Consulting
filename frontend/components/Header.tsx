import Link from "next/link";
import { MobileMenu } from "@/components/MobileMenu";
import { HeaderAuth } from "@/components/HeaderAuth";
import { navItems } from "@/data/siteContent";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur-xl">
      <div className="section-shell flex h-[var(--header-height)] items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2 rounded-pill text-base font-semibold tracking-[-0.02em] text-ink">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          Arvexo AI
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Основная навигация">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="focus-ring rounded-pill px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center lg:flex">
          <HeaderAuth />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
