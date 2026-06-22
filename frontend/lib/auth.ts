export type AccountUser = {
  id: string;
  email: string | null;
  name: string | null;
  avatar_url: string | null;
};

export type LeadStatus = "new" | "contacted" | "in_progress" | "done" | "rejected";

export type LeadListItem = {
  id: string;
  task: string;
  budget: string | null;
  created_at: string;
  status: LeadStatus;
  telegram_status: string;
};

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
}

export async function getCurrentUser(): Promise<AccountUser | null> {
  try {
    const res = await fetch(`${getApiBase()}/api/auth/me`, {
      credentials: "include",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function logout(): Promise<void> {
  await fetch(`${getApiBase()}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function getMyLeads(): Promise<LeadListItem[]> {
  const res = await fetch(`${getApiBase()}/api/account/leads`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export function buildSSOLoginUrl(): string {
  // NEXT_PUBLIC_ACCOUNT_SSO_URL must include the API base path:
  // prod:  https://api.account.arvexo.ru
  // local: http://localhost:9100/api
  const accountApiBase = (process.env.NEXT_PUBLIC_ACCOUNT_SSO_URL ?? "https://api.account.arvexo.ru").replace(/\/$/, "");
  const clientId = process.env.NEXT_PUBLIC_ACCOUNT_CLIENT_ID ?? "arvexo-consulting";
  const redirectUri = process.env.NEXT_PUBLIC_ACCOUNT_REDIRECT_URI ?? "https://ai.arvexo.ru/api/auth/callback";
  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, state });
  return `${accountApiBase}/sso/start?${params.toString()}`;
}
