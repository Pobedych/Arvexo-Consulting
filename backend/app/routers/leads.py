import logging

from fastapi import APIRouter, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_session
from app.models import Lead
from app.schemas import LeadCreate, LeadResponse
from app.services.telegram import send_lead_to_telegram
from app.utils.rate_limit import check_rate_limit
from app.utils.security import get_client_ip

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api", tags=["leads"])


@router.post("/leads", response_model=LeadResponse)
async def create_lead(
    payload: LeadCreate, request: Request, session: AsyncSession = Depends(get_session)
) -> LeadResponse:
    if payload.website:
        return LeadResponse(ok=True, message="Lead received")

    check_rate_limit(request)

    lead = Lead(
        name=payload.name,
        contact=payload.contact,
        company=payload.company,
        task=payload.task,
        budget=payload.budget,
        ip_address=get_client_ip(request),
        user_agent=request.headers.get("user-agent"),
        privacy_consent=payload.privacy_consent,
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
