import type { LeadFormData } from "@/lib/validation";

export type LeadResponse = {
  ok: boolean;
  message?: string;
  detail?: string;
};

function getLeadUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");
  return baseUrl ? `${baseUrl}/api/leads` : "/api/leads";
}

export async function submitLead(data: LeadFormData): Promise<LeadResponse> {
  const response = await fetch(getLeadUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const payload = (await response.json().catch(() => ({
    ok: false,
    detail: "Не удалось прочитать ответ сервера"
  }))) as LeadResponse;

  if (!response.ok) {
    return {
      ok: false,
      detail: payload.detail || "Заявка не отправлена. Проверьте поля и попробуйте снова."
    };
  }

  return payload;
}
