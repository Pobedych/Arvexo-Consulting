import type { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-[24px] border border-line bg-white p-6 shadow-card transition hover:-translate-y-1 hover:border-blue-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
