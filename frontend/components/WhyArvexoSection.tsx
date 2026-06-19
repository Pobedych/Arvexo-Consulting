"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { benefits } from "@/data/siteContent";
import { viewportOnce } from "@/lib/animations";

const ease = [0.22, 1, 0.36, 1] as const;

export function WhyArvexoSection() {
  return (
    <section id="why" className="bg-ink py-20 sm:py-28 overflow-hidden">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.65, ease }}
          >
            <p className="mono-label mb-4 text-white/40">Почему Arvexo</p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl lg:text-[2.6rem]">
              Без магии, воды<br />
              <em className="not-italic font-cormorant italic text-accent">&ldquo;и AI ради AI&rdquo;</em>
            </h2>
            <p className="mt-6 text-base leading-8 text-white/60 sm:text-lg">
              Мы не продаём абстрактную цифровую трансформацию. Разбираем конкретный
              процесс, проектируем решение, разрабатываем прототип и внедряем в реальную
              работу бизнеса.
            </p>
          </motion.div>

          <motion.div
            className="grid gap-2.5 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit}
                variants={{
                  hidden:  { opacity: 0, y: 16, scale: 0.97 },
                  visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4, ease } },
                }}
                className="flex items-start gap-3 rounded-card border border-white/8 bg-white/5 px-4 py-3"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" aria-hidden="true" />
                <p className="text-sm font-medium leading-6 text-white/80">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
