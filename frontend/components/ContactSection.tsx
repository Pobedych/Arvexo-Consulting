import { FadeUp } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";

export function ContactSection() {
  return (
    <section id="contact" className="bg-bg py-20 sm:py-28">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <FadeUp>
          <SectionTitle
            eyebrow="Заявка"
            title="Хотите понять, где AI поможет вашему бизнесу?"
            subtitle="Опишите задачу в свободной форме. Мы подскажем, какой формат решения подойдёт: аудит, бот, ассистент, интеграция или MVP."
          />
        </FadeUp>
        <FadeUp delay={0.1}>
          <ContactForm />
        </FadeUp>
      </div>
    </section>
  );
}
