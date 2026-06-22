import logging

import jwt
from fastapi import APIRouter, Cookie, Depends, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_session
from app.models import Lead
from app.schemas import LeadCreate, LeadListItem, LeadResponse
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
    leads = result.scalars().all()
    return [
        LeadListItem(
            id=str(lead.id),
            task=lead.task,
            budget=lead.budget,
            created_at=lead.created_at.isoformat(),
            telegram_status=lead.telegram_status,
        )
        for lead in leads
    ]
