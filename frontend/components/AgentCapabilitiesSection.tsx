"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/SectionTitle";
import { FadeUp } from "@/components/Reveal";
import { capabilities } from "@/data/siteContent";
import { viewportOnce } from "@/lib/animations";

export function AgentCapabilitiesSection() {
  return (
    <section id="agents" className="bg-surface-alt py-20 sm:py-28">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <FadeUp>
            <SectionTitle
              counter="(03)"
              eyebrow="AI workflows"
              title="AI-агенты под конкретные задачи бизнеса"
              subtitle="Собираем AI-решения не как один универсальный чат, а как систему с отдельными возможностями."
            />
          </FadeUp>

          <motion.div
            className="divide-y divide-hairline rounded-card2 border border-hairline bg-surface"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } } }}
          >
            {capabilities.map((item, index) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden:  { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
                }}
                className="flex items-start gap-5 px-6 py-5 transition hover:bg-bg"
              >
                <span className="mono-label w-6 shrink-0 pt-0.5 text-[10px]">
                  0{index + 1}
                </span>
                <div className="flex items-start gap-4">
                  <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" strokeWidth={1.8} aria-hidden="true" />
                  <div>
                    <p className="text-[0.95rem] font-semibold tracking-[-0.015em] text-ink">{item.title}</p>
                    <p className="mt-1.5 text-sm leading-6 text-muted">{item.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
