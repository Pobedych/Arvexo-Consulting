import logging
from datetime import UTC, datetime

import jwt
from fastapi import APIRouter, Cookie, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_session
from app.models import Lead
from app.schemas import AdminLeadItem, AdminNotesUpdate, LeadCreate, LeadListItem, LeadResponse, LeadStatusUpdate
from app.services.telegram import send_lead_to_telegram
from app.utils.rate_limit import check_rate_limit
from app.utils.security import get_client_ip

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["leads"])
settings = get_settings()


def _get_account_id_from_cookie(token: str | None) -> str | None:
    if not token:
        return None
    try:
        payload = jwt.decode(token, settings.session_secret, algorithms=["HS256"])
        return payload.get("sub")
    except jwt.InvalidTokenError:
        return None


def _require_admin(account_id: str | None) -> str:
    if not account_id:
        raise HTTPException(status_code=401, detail="Not authenticated")
    if account_id not in settings.admin_account_id_list:
        raise HTTPException(status_code=403, detail="Forbidden")
    return account_id


def _map_lead_list_item(lead: Lead) -> LeadListItem:
    return LeadListItem(
        id=str(lead.id),
        task=lead.task,
        budget=lead.budget,
        service_type=lead.service_type,
        urgency=lead.urgency,
        created_at=lead.created_at.isoformat(),
        status=lead.status,
        status_updated_at=lead.status_updated_at.isoformat() if lead.status_updated_at else None,
        telegram_status=lead.telegram_status,
    )


def _map_admin_lead_item(lead: Lead) -> AdminLeadItem:
    return AdminLeadItem(
        id=str(lead.id),
        name=lead.name,
        contact=lead.contact,
        company=lead.company,
        task=lead.task,
        budget=lead.budget,
        service_type=lead.service_type,
        urgency=lead.urgency,
        status=lead.status,
        status_updated_at=lead.status_updated_at.isoformat() if lead.status_updated_at else None,
        admin_notes=lead.admin_notes,
        telegram_status=lead.telegram_status,
        arvexo_account_id=lead.arvexo_account_id,
        created_at=lead.created_at.isoformat(),
    )


@router.post("/leads", response_model=LeadResponse)
async def create_lead(
    payload: LeadCreate,
    request: Request,
    session: AsyncSession = Depends(get_session),
    consulting_session: str | None = Cookie(default=None),
) -> LeadResponse:
    if payload.website:
        return LeadResponse(ok=True, message="Lead received")

    check_rate_limit(request)

    account_id = _get_account_id_from_cookie(consulting_session)

    lead = Lead(
        name=payload.name,
        contact=payload.contact,
        company=payload.company,
        task=payload.task,
        budget=payload.budget,
        service_type=payload.service_type,
        urgency=payload.urgency,
        ip_address=get_client_ip(request),
        user_agent=request.headers.get("user-agent"),
        privacy_consent=payload.privacy_consent,
        arvexo_account_id=account_id,
        telegram_status="pending",
    )
    session.add(lead)
    await session.commit()
    await session.refresh(lead)

    sent, error = await send_lead_to_telegram(payload)
    lead.telegram_status = "sent" if sent else "failed"
    lead.telegram_error = None if sent else (error or "Unknown Telegram error")
    await session.commit()

    if not sent:
        logger.warning("Lead %s saved, Telegram notification failed: %s", lead.id, lead.telegram_error)

    return LeadResponse(ok=True, message="Lead received")


@router.get("/account/leads", response_model=list[LeadListItem])
async def get_my_leads(
    consulting_session: str | None = Cookie(default=None),
    session: AsyncSession = Depends(get_session),
) -> list[LeadListItem]:
    account_id = _get_account_id_from_cookie(consulting_session)
    if not account_id:
        raise HTTPException(status_code=401, detail="Not authenticated")

    result = await session.execute(
        select(Lead).where(Lead.arvexo_account_id == account_id).order_by(Lead.created_at.desc())
    )
    return [_map_lead_list_item(lead) for lead in result.scalars().all()]


@router.patch("/leads/{lead_id}/status", response_model=LeadResponse)
async def update_lead_status(
    lead_id: str,
    body: LeadStatusUpdate,
    consulting_session: str | None = Cookie(default=None),
    session: AsyncSession = Depends(get_session),
) -> LeadResponse:
    _require_admin(_get_account_id_from_cookie(consulting_session))

    result = await session.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.status = body.status
    lead.status_updated_at = datetime.now(UTC)
    await session.commit()
    return LeadResponse(ok=True)


@router.patch("/admin/leads/{lead_id}/notes", response_model=LeadResponse)
async def update_lead_notes(
    lead_id: str,
    body: AdminNotesUpdate,
    consulting_session: str | None = Cookie(default=None),
    session: AsyncSession = Depends(get_session),
) -> LeadResponse:
    _require_admin(_get_account_id_from_cookie(consulting_session))

    result = await session.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    lead.admin_notes = body.notes.strip() or None
    await session.commit()
    return LeadResponse(ok=True)


@router.get("/admin/leads", response_model=list[AdminLeadItem])
async def admin_get_leads(
    consulting_session: str | None = Cookie(default=None),
    session: AsyncSession = Depends(get_session),
) -> list[AdminLeadItem]:
    _require_admin(_get_account_id_from_cookie(consulting_session))

    result = await session.execute(select(Lead).order_by(Lead.created_at.desc()))
    return [_map_admin_lead_item(lead) for lead in result.scalars().all()]
