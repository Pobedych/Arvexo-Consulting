"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { buildSSOLoginUrl, logout } from "@/lib/auth";
import { Button } from "@/components/Button";

export function HeaderAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="h-8 w-24 animate-pulse rounded-pill bg-surface" />;
  }

  if (user) {
    const displayName = user.name ?? user.email ?? "Аккаунт";
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/account"
          className="focus-ring rounded-pill px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:text-ink"
        >
          {displayName}
        </Link>
        <button
          onClick={async () => {
            await logout();
            router.refresh();
          }}
          className="focus-ring rounded-pill px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:text-ink"
        >
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <a
        href={buildSSOLoginUrl()}
        className="focus-ring rounded-pill px-4 py-2 text-sm font-medium text-muted transition duration-200 hover:text-ink"
      >
        Войти
      </a>
      <Button href="#contact">Обсудить проект</Button>
    </div>
  );
}
