"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { NativeButton } from "@/components/Button";
import { budgetOptions } from "@/data/siteContent";
import { submitLead } from "@/lib/api";
import { type LeadFormData, type LeadFormErrors, validateLeadForm } from "@/lib/validation";

const initialData: LeadFormData = {
  name: "",
  contact: "",
  company: "",
  task: "",
  budget: "Пока не знаю",
  website: "",
  privacyConsent: false,
};

export function ContactForm() {
  const [data, setData] = useState<LeadFormData>(initialData);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [budgetOpen, setBudgetOpen] = useState(false);

  function updateField<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateLeadForm(data);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      setMessage("Проверьте обязательные поля.");
      return;
    }

    setStatus("loading");
    setMessage("");
    const result = await submitLead(data);

    if (result.ok) {
      setStatus("success");
      setMessage("Заявка отправлена. Мы свяжемся с вами после обработки.");
      setData(initialData);
      return;
    }

    setStatus("error");
    setMessage(result.detail || "Не удалось отправить заявку. Попробуйте позже.");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-card2 border border-hairline bg-surface p-6 shadow-panel sm:p-8"
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Имя" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
            className="field"
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Контакт" htmlFor="contact" error={errors.contact}>
          <input
            id="contact"
            name="contact"
            value={data.contact}
            onChange={(e) => updateField("contact", e.target.value)}
            className="field"
            autoComplete="email"
            placeholder="Telegram, телефон или email"
            required
          />
        </Field>
        <Field label="Компания" htmlFor="company">
          <input
            id="company"
            name="company"
            value={data.company}
            onChange={(e) => updateField("company", e.target.value)}
            className="field"
            autoComplete="organization"
          />
        </Field>
        <Field label="Бюджет" htmlFor="budget">
          <div className="relative">
            <input type="hidden" id="budget" name="budget" value={data.budget} />
            <button
              type="button"
              className={`field flex min-h-[52px] w-full items-center justify-between gap-3 text-left ${budgetOpen ? "field-focus" : ""}`}
              aria-haspopup="listbox"
              aria-expanded={budgetOpen}
              aria-labelledby="budget-label"
              onClick={() => setBudgetOpen((v) => !v)}
              onKeyDown={(e) => { if (e.key === "Escape") setBudgetOpen(false); }}
            >
              <span className="text-sm">{data.budget}</span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-faint transition duration-200 ${budgetOpen ? "rotate-180 text-accent" : ""}`}
                aria-hidden="true"
              />
            </button>
            {budgetOpen ? (
              <div
                className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 overflow-hidden rounded-card2 border border-hairline bg-surface p-1.5 shadow-panel"
                role="listbox"
                aria-label="Бюджет"
              >
                {budgetOptions.map((option) => {
                  const selected = data.budget === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={`focus-ring flex w-full items-center justify-between gap-3 rounded-card px-4 py-2.5 text-left text-sm font-medium transition duration-150 ${
                        selected ? "bg-accent/8 text-accent" : "text-ink hover:bg-bg"
                      }`}
                      onClick={() => { updateField("budget", option); setBudgetOpen(false); }}
                    >
                      <span>{option}</span>
                      {selected ? <Check size={15} aria-hidden="true" /> : null}
                    </button>
                  );
                })}
              </div>
            ) : null}
          </div>
        </Field>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          value={data.website}
          onChange={(e) => updateField("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Задача" htmlFor="task" error={errors.task} className="mt-4">
        <textarea
          id="task"
          name="task"
          value={data.task}
          onChange={(e) => updateField("task", e.target.value)}
          className="field min-h-36 resize-y"
          placeholder="Например: хотим автоматизировать заявки из Telegram и сайта, передавать данные в CRM и быстрее отвечать клиентам."
          required
        />
      </Field>

      <label className="mt-4 flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          type="checkbox"
          checked={data.privacyConsent}
          onChange={(e) => updateField("privacyConsent", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-hairline-md accent-accent"
          required
        />
        <span>
          Я согласен на обработку персональных данных и принимаю{" "}
          <Link href="/privacy" className="font-semibold text-accent underline-offset-4 hover:underline">
            политику конфиденциальности
          </Link>
          .
          {errors.privacyConsent ? (
            <span className="mt-1 block text-red-600">{errors.privacyConsent}</span>
          ) : null}
        </span>
      </label>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <NativeButton type="submit" disabled={status === "loading" || !data.privacyConsent}>
          {status === "loading" ? "Отправляем..." : "Получить консультацию"}
        </NativeButton>
        {message ? (
          <p
            className={`text-sm font-medium ${status === "success" ? "text-success" : "text-red-600"}`}
            role="status"
          >
            {message}
          </p>
        ) : null}
      </div>

      <style jsx>{`
        .field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(20,19,15,.12);
          background: #fff;
          padding: 0.8rem 1rem;
          font-size: 0.875rem;
          color: #14130F;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }
        .field:focus,
        .field-focus {
          border-color: #E5402C;
          box-shadow: 0 0 0 3px rgba(229,64,44,0.12);
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  error,
  className = "",
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label id={`${htmlFor}-label`} htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-ink">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
