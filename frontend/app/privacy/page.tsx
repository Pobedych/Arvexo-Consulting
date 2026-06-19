import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-canvas px-5 py-16 text-ink">
      <article className="mx-auto max-w-3xl rounded-[24px] border border-line bg-white p-8 shadow-card sm:p-10">
        <Link href="/" className="focus-ring text-sm font-semibold text-accent">
          ← На главную
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-[-0.03em]">Политика конфиденциальности</h1>
        <div className="mt-6 space-y-5 text-base leading-7 text-muted">
          <p>
            Сайт Arvexo AI Consulting собирает данные, которые пользователь добровольно отправляет через форму:
            имя, контакт, компанию, описание задачи и выбранный бюджет.
          </p>
          <p>
            Эти данные используются для обработки заявки, связи с пользователем и подготовки предложения по
            AI-консалтингу, автоматизации или разработке MVP.
          </p>
          <p>
            Заявки сохраняются в базе данных проекта и могут отправляться владельцу проекта в Telegram-уведомлении.
            Реальные токены и служебные ключи не публикуются на сайте.
          </p>
          <p>
            Чтобы запросить удаление или уточнение данных, напишите на контакт, указанный на сайте, и опишите,
            какую заявку нужно удалить.
          </p>
          <p>
            Юридический текст может быть расширен перед публичным запуском и подключением полноценной политики
            обработки персональных данных.
          </p>
        </div>
      </article>
    </main>
  );
}
