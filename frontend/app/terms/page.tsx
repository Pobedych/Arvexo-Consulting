import Link from "next/link";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-16 text-ink">
      <article className="mx-auto max-w-3xl rounded-[24px] border border-line bg-white p-8 shadow-card sm:p-10">
        <Link href="/" className="focus-ring text-sm font-semibold text-accent">
          ← На главную
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.03em]">Условия использования</h1>
        <div className="mt-6 space-y-5 text-base leading-7 text-muted">
          <p>
            Сайт предоставляет информацию о направлении Arvexo AI Consulting: AI-аудите, автоматизации
            бизнес-процессов, ботах, ассистентах и интеграциях.
          </p>
          <p>
            Отправка формы не является заключением договора, публичной офертой или гарантией выполнения проекта.
            Формат, сроки, стоимость и состав работ обсуждаются индивидуально.
          </p>
          <p>
            Владелец сайта может обновлять информацию, условия и описание услуг без отдельного уведомления.
          </p>
          <p>
            Перед началом работ стороны отдельно согласуют техническое задание, порядок оплаты, ответственность и
            требования к данным.
          </p>
        </div>
      </article>
    </main>
  );
}
