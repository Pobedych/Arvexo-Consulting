from typing import Literal, get_args

from pydantic import BaseModel, ConfigDict, Field, field_validator

BudgetValue = Literal["Пока не знаю", "До 50 000 ₽", "50 000–150 000 ₽", "150 000–300 000 ₽", "300 000 ₽+"]


class LeadCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    contact: str = Field(min_length=3, max_length=150)
    company: str | None = Field(default=None, max_length=150)
    task: str = Field(min_length=10, max_length=3000)
    budget: BudgetValue | None = None
    website: str | None = Field(default=None, max_length=200)
    privacy_consent: bool = Field(alias="privacyConsent")

    model_config = ConfigDict(populate_by_name=True)

    @field_validator("name", "contact", "company", "task", "budget", "website", mode="before")
    @classmethod
    def clean_strings(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        return cleaned or None

    @field_validator("privacy_consent")
    @classmethod
    def consent_must_be_true(cls, value: bool) -> bool:
        if value is not True:
            raise ValueError("Privacy consent is required")
        return value


class LeadResponse(BaseModel):
    ok: bool
    message: str | None = None
    detail: str | None = None


LeadStatus = Literal["new", "contacted", "in_progress", "done", "rejected"]
LEAD_STATUSES: list[str] = list(get_args(LeadStatus))


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class LeadListItem(BaseModel):
    id: str
    task: str
    budget: str | None
    created_at: str
    status: str
    telegram_status: str


class AdminLeadItem(BaseModel):
    id: str
    name: str
    contact: str
    company: str | None
    task: str
    budget: str | None
    status: str
    telegram_status: str
    arvexo_account_id: str | None
    created_at: str
