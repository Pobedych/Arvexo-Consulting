import { AgentCapabilitiesSection } from "@/components/AgentCapabilitiesSection";
import { AudienceSection } from "@/components/AudienceSection";
import { AuditOutputSection } from "@/components/AuditOutputSection";
import { ContactSection } from "@/components/ContactSection";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProcessSection } from "@/components/ProcessSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SolutionsSection } from "@/components/SolutionsSection";
import { WhyArvexoSection } from "@/components/WhyArvexoSection";

export default function Home() {
  return (
    <>
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
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
