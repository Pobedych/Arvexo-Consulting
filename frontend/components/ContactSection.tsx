import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export function ContactSection() {
  return (
    <section id="contact" className="bg-paper py-16 sm:py-24 lg:py-28">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionTitle
          eyebrow="Заявка"
          title="Хотите понять, где AI поможет вашему бизнесу?"
          subtitle="Опишите задачу в свободной форме. Мы подскажем, какой формат решения подойдёт: аудит, бот, ассистент, интеграция или MVP."
        />
        <ContactForm />
      </div>
    </section>
  );
}
