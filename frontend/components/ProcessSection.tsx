"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { FadeUp } from "@/components/Reveal";
import { processSteps } from "@/data/siteContent";
import { viewportOnce } from "@/lib/animations";

export function ProcessSection() {
  return (
    <section id="process" className="bg-bg py-20 sm:py-28">
      <div className="section-shell">
        <FadeUp>
          <SectionTitle
            counter="(04)"
            eyebrow="Процесс"
            title="От идеи до рабочего AI-решения"
            align="center"
          />
        </FadeUp>
        <motion.div
          className="mt-12 divide-y divide-hairline rounded-card2 border border-hairline bg-surface"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={{
                hidden:  { opacity: 0, x: -24 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
              }}
              className="grid grid-cols-[48px_1fr_1.6fr] items-start gap-6 px-6 py-6 transition hover:bg-bg sm:gap-8"
            >
              <span className="mono-label text-[10px] text-accent pt-0.5">0{index + 1}</span>
              <p className="text-[0.95rem] font-semibold tracking-[-0.015em] text-ink">{step.title}</p>
              <p className="text-sm leading-7 text-muted">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
