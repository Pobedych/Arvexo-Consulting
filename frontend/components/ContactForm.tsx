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
  privacyConsent: false
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
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-line bg-white p-6 shadow-soft sm:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Имя" htmlFor="name" error={errors.name}>
          <input
            id="name"
            name="name"
            value={data.name}
            onChange={(event) => updateField("name", event.target.value)}
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
            onChange={(event) => updateField("contact", event.target.value)}
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
            onChange={(event) => updateField("company", event.target.value)}
            className="field"
            autoComplete="organization"
          />
        </Field>
        <Field label="Бюджет" htmlFor="budget">
          <div className="relative">
            <input type="hidden" id="budget" name="budget" value={data.budget} />
            <button
              type="button"
              className={`field flex min-h-[54px] items-center justify-between gap-3 text-left ${
                budgetOpen ? "border-accent shadow-[0_0_0_3px_rgba(29,78,216,0.14)]" : ""
              }`}
              aria-haspopup="listbox"
              aria-expanded={budgetOpen}
              aria-labelledby="budget-label"
              onClick={() => setBudgetOpen((value) => !value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setBudgetOpen(false);
                }
              }}
            >
              <span>{data.budget}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-muted transition ${budgetOpen ? "rotate-180 text-accent" : ""}`}
                aria-hidden="true"
              />
            </button>
            {budgetOpen ? (
              <div
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[20px] border border-blue-100 bg-white p-2 shadow-soft"
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
                      className={`focus-ring flex w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                        selected ? "bg-blue-50 text-accent" : "text-ink hover:bg-paper"
                      }`}
                      onClick={() => {
                        updateField("budget", option);
                        setBudgetOpen(false);
                      }}
                    >
                      <span>{option}</span>
                      {selected ? <Check size={17} aria-hidden="true" /> : null}
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
          onChange={(event) => updateField("website", event.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Field label="Задача" htmlFor="task" error={errors.task} className="mt-5">
        <textarea
          id="task"
          name="task"
          value={data.task}
          onChange={(event) => updateField("task", event.target.value)}
          className="field min-h-36 resize-y"
          placeholder="Например: хотим автоматизировать заявки из Telegram и сайта, передавать данные в CRM и быстрее отвечать клиентам."
          required
        />
      </Field>

      <label className="mt-5 flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          type="checkbox"
          checked={data.privacyConsent}
          onChange={(event) => updateField("privacyConsent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-line text-accent focus:ring-accent"
          required
        />
        <span>
          Я согласен на обработку персональных данных и принимаю{" "}
          <Link href="/privacy" className="font-semibold text-accent underline-offset-4 hover:underline">
            политику конфиденциальности
          </Link>
          .
          {errors.privacyConsent ? <span className="mt-1 block text-red-600">{errors.privacyConsent}</span> : null}
        </span>
      </label>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <NativeButton type="submit" disabled={status === "loading" || !data.privacyConsent}>
          {status === "loading" ? "Отправляем..." : "Получить консультацию"}
        </NativeButton>
        {message ? (
          <p className={`text-sm font-medium ${status === "success" ? "text-green-700" : "text-red-600"}`} role="status">
            {message}
          </p>
        ) : null}
      </div>
      <style jsx>{`
        .field {
          width: 100%;
          border-radius: 18px;
          border: 1px solid #e5e7eb;
          background: #fafaf7;
          padding: 0.875rem 1rem;
          color: #111111;
          outline: none;
          transition: border-color 150ms ease, box-shadow 150ms ease;
        }

        .field:focus {
          border-color: #1d4ed8;
          box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.14);
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
  children
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
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
