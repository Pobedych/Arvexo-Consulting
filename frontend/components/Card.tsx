import type { HTMLAttributes, ReactNode } from "react";

export function Card({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={`rounded-card2 border border-hairline bg-surface p-6 transition duration-200 hover:-translate-y-0.5 hover:border-hairline-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
