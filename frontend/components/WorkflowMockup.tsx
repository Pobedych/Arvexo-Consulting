"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDot } from "lucide-react";
import { useEffect, useState } from "react";
import { heroWorkflow, trustPoints } from "@/data/siteContent";

export function WorkflowMockup() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    heroWorkflow.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), 800 + i * 420));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="mx-auto w-full max-w-[480px] rounded-card2 border border-hairline bg-surface p-5 shadow-panel">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-success"
            style={{ animation: "pulse-dot 2s ease-in-out infinite" }}
            aria-hidden="true"
          />
          <span className="mono-label text-[10.5px]">workflow · active</span>
        </div>
        <span className="mono-label text-[10.5px]">ai.arvexo.ru</span>
      </div>

      <div className="rounded-card border border-hairline bg-bg p-4">
        <p className="mono-label mb-3">Обработка заявки</p>

        <div className="space-y-2">
          {heroWorkflow.map((step, index) => {
            const isDone = index === heroWorkflow.length - 1;
            const isVisible = index < visibleCount;
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -12, scale: 0.97 }}
                animate={isVisible ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: -12, scale: 0.97 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 rounded-card border border-hairline bg-surface px-3 py-2.5"
              >
                <motion.div
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                    isDone ? "bg-success/10 text-success" : "bg-accent/8 text-accent"
                  }`}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1], delay: 0.12 }}
                >
                  {isDone ? (
                    <CheckCircle2 size={15} aria-hidden="true" />
                  ) : (
                    <CircleDot size={15} aria-hidden="true" />
                  )}
                </motion.div>
                <p className="text-sm font-medium text-ink">{step}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 grid grid-cols-3 divide-x divide-hairline rounded-card border border-hairline bg-surface">
          {trustPoints.map((point, i) => (
            <motion.div
              key={point.label}
              className="px-3 py-2.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.12, duration: 0.4 }}
            >
              <p className="mono-label text-[9.5px]">{point.label}</p>
              <p className="mt-1 text-xs font-semibold text-ink">{point.value}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.35; }
        }
      `}</style>
    </div>
  );
}
