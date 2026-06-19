import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary:   "bg-ink text-surface hover:bg-accent",
  secondary: "border border-hairline-md bg-surface text-ink hover:border-accent/40 hover:bg-white",
  ghost:     "text-muted hover:text-ink hover:bg-surface",
};

const baseClass =
  "focus-ring inline-flex min-h-11 items-center justify-center rounded-pill px-6 py-3 text-sm font-semibold transition duration-200";

type LinkButtonProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, variant = "primary", className = "", href, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function NativeButton({ children, variant = "primary", className = "", ...props }: NativeButtonProps) {
  return (
    <button
      className={`${baseClass} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
