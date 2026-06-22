import { AgentCapabilitiesSection } from "@/components/AgentCapabilitiesSection";
import { AudienceSection } from "@/components/AudienceSection";
import { AuditOutputSection } from "@/components/AuditOutputSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PriceCalculator } from "@/components/PriceCalculator";
import { ProblemSection } from "@/components/ProblemSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { WhyArvexoSection } from "@/components/WhyArvexoSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://ai.arvexo.ru/#business",
      name: "Arvexo AI Consulting",
      url: "https://ai.arvexo.ru",
      description:
        "AI-консалтинг и автоматизация бизнес-процессов: аудит, Telegram-боты, ассистенты, CRM-интеграции.",
      areaServed: { "@type": "Country", name: "Russia" },
      availableLanguage: "Russian",
      sameAs: ["https://arvexo.ru"],
    },
    {
      "@type": "Service",
      "@id": "https://ai.arvexo.ru/#service-audit",
      name: "AI-аудит бизнеса",
      provider: { "@id": "https://ai.arvexo.ru/#business" },
      description: "Анализ бизнес-процессов и поиск точек автоматизации с помощью AI.",
    },
    {
      "@type": "Service",
      "@id": "https://ai.arvexo.ru/#service-bots",
      name: "AI-боты для клиентов",
      provider: { "@id": "https://ai.arvexo.ru/#business" },
      description: "Telegram-боты для продаж, поддержки и обработки заявок.",
    },
    {
      "@type": "Service",
      "@id": "https://ai.arvexo.ru/#service-assistants",
      name: "Внутренние AI-ассистенты",
      provider: { "@id": "https://ai.arvexo.ru/#business" },
      description: "Ассистенты для сотрудников на основе корпоративной базы знаний.",
    },
    {
      "@type": "Service",
      "@id": "https://ai.arvexo.ru/#service-integrations",
      name: "Интеграции и автоматизация",
      provider: { "@id": "https://ai.arvexo.ru/#business" },
      description: "Подключение AI к Telegram, CRM, таблицам и внутренним сервисам через API.",
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <ServicesSection />
        <AgentCapabilitiesSection />
        <ProcessSection />
        <SolutionsSection />
        <AudienceSection />
        <AuditOutputSection />
        <WhyArvexoSection />
        <PriceCalculator />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
