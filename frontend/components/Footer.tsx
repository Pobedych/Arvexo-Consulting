import Link from "next/link";

const ecosystemLinks = [
  { label: "arvexo.ru", href: "https://arvexo.ru" },
  { label: "connect.arvexo.ru", href: "https://connect.arvexo.ru" },
  { label: "study.arvexo.ru", href: "https://study.arvexo.ru" },
  { label: "account.arvexo.ru", href: "https://account.arvexo.ru" },
];

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-bg py-10">
      <div className="section-shell">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
              <p className="text-sm font-semibold text-ink">Arvexo AI</p>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
              AI-консалтинг и автоматизация бизнес-процессов.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="mono-label mb-2">Экосистема</p>
            {ecosystemLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="focus-ring text-sm text-muted transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <p className="mono-label mb-2">Документы</p>
            <Link href="/privacy" className="focus-ring text-sm text-muted transition hover:text-ink">
              Конфиденциальность
            </Link>
            <Link href="/terms" className="focus-ring text-sm text-muted transition hover:text-ink">
              Условия
            </Link>
          </div>
        </div>

        <p className="mono-label mt-8 border-t border-hairline pt-6">
          © 2026 Arvexo · ai.arvexo.ru
        </p>
      </div>
    </footer>
  );
}
