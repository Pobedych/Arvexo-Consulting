import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas py-10">
      <div className="section-shell flex flex-col gap-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-ink">Arvexo AI</p>
          <p className="mt-1">AI-консалтинг и автоматизация бизнес-процессов.</p>
        </div>
        <div className="flex gap-5">
          <Link href="/privacy" className="focus-ring rounded text-muted hover:text-ink">
            Конфиденциальность
          </Link>
          <Link href="/terms" className="focus-ring rounded text-muted hover:text-ink">
            Условия
          </Link>
        </div>
      </div>
    </footer>
  );
}
