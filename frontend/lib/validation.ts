export type LeadFormData = {
  name: string;
  contact: string;
  company: string;
  task: string;
  budget: string;
  website: string;
  privacyConsent: boolean;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

export function validateLeadForm(data: LeadFormData): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (data.name.trim().length < 2) {
    errors.name = "Укажите имя, минимум 2 символа.";
  }

  if (data.contact.trim().length < 3) {
    errors.contact = "Укажите контакт для связи.";
  }

  if (data.task.trim().length < 10) {
    errors.task = "Опишите задачу подробнее, минимум 10 символов.";
  }

  if (!data.privacyConsent) {
    errors.privacyConsent = "Нужно согласие на обработку данных.";
  }

  return errors;
}
