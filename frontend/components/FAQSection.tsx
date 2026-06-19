"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { faq } from "@/data/siteContent";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-canvas py-16 sm:py-24 lg:py-28">
      <div className="section-shell">
        <SectionTitle eyebrow="FAQ" title="Частые вопросы" align="center" />
        <div className="mx-auto mt-10 max-w-3xl divide-y divide-line rounded-[24px] border border-line bg-white shadow-card">
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="text-base font-semibold text-ink">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-muted transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div id={panelId} className="px-5 pb-5 text-base leading-7 text-muted">
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
