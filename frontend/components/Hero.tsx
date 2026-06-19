"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { WorkflowMockup } from "@/components/WorkflowMockup";
import { microcopy } from "@/data/siteContent";

const ease = [0.22, 1, 0.36, 1] as const;

const item = (delay: number) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
});

const mockupVariant = {
  hidden:  { opacity: 0, x: 40, y: 10 },
  visible: { opacity: 1, x: 0,  y: 0,  transition: { duration: 0.75, ease, delay: 0.2 } },
};

export function Hero() {
  return (
    <section className="bg-bg py-20 sm:py-28 lg:py-32">
      <div className="section-shell grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial="hidden" animate="visible">
          <motion.p variants={item(0)} className="mono-label mb-6">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" aria-hidden="true" />
            AI-консалтинг · Arvexo
          </motion.p>

          <motion.h1
            variants={item(0.08)}
            className="max-w-2xl text-[2.8rem] font-semibold leading-[1.0] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.2rem]"
          >
            AI-консалтинг и автоматизация{" "}
            <em className="not-italic font-cormorant italic text-accent">для бизнеса</em>
          </motion.h1>

          <motion.p
            variants={item(0.16)}
            className="mt-7 max-w-xl text-lg leading-8 text-muted sm:text-xl"
          >
            Помогаем компаниям внедрять AI в продажи, поддержку, аналитику и внутренние процессы:
            от аудита и прототипа до полноценной интеграции.
          </motion.p>

          <motion.div variants={item(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact" className="gap-2">
              Обсудить проект <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button href="#services" variant="secondary">
              Посмотреть услуги
            </Button>
          </motion.div>

          <motion.p variants={item(0.32)} className="mt-7 text-sm leading-6 text-faint">
            {microcopy}
          </motion.p>
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={mockupVariant}>
          <WorkflowMockup />
        </motion.div>
      </div>
    </section>
  );
}
