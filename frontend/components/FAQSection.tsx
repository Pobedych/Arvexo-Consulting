"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { FadeUp } from "@/components/Reveal";
import { SectionTitle } from "@/components/SectionTitle";
import { faq } from "@/data/siteContent";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="bg-ink-2 py-20 sm:py-28">
      <div className="section-shell">
        <FadeUp>
          <SectionTitle eyebrow="FAQ" title="Частые вопросы" align="center" dark />
        </FadeUp>

        <motion.div
          className="mx-auto mt-10 max-w-3xl divide-y divide-white/8 rounded-card2 border border-white/8 bg-white/4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {faq.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            return (
              <div key={item.question}>
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-4 rounded-card px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="text-base font-semibold text-white">{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ChevronDown className="h-5 w-5 text-white/40" aria-hidden="true" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-5 text-base leading-7 text-white/60">
                        {item.answer}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
