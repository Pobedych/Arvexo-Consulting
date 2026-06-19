import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type BaseProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

const variants = {
  primary: "bg-accent text-white shadow-[0_14px_36px_rgba(29,78,216,0.22)] hover:bg-blue-700",
  secondary: "border border-line bg-white text-ink hover:border-accent/30 hover:bg-blue-50",
  ghost: "text-muted hover:bg-white hover:text-ink"
};

const baseClass =
  "focus-ring inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition";

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
    <button className={`${baseClass} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-55 ${className}`} {...props}>
      {children}
    </button>
  );
}
