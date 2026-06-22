"""
Telegram webhook router.

Telegram sends callback_query events here when an admin clicks a status button
on a lead notification message. The handler updates the lead status in the DB
and edits the Telegram message to reflect the change.

Register the webhook URL with:
  POST /api/telegram/set-webhook
  Header: X-Admin-Token: <TELEGRAM_WEBHOOK_SECRET>
"""

import logging

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from fastapi import APIRouter, Depends, Header, HTTPException, Request
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import get_settings
from app.database import get_session
from app.models import Lead
from app.routers.leads import _notify_status_change
from app.schemas import LEAD_STATUSES

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/telegram", tags=["telegram"])
settings = get_settings()


@router.post("/webhook")
async def telegram_webhook(
    request: Request,
    session: AsyncSession = Depends(get_session),
) -> dict:
    # Validate secret token set via Telegram setWebhook
    tg_token = request.headers.get("X-Telegram-Bot-Api-Secret-Token", "")
    if settings.telegram_webhook_secret and tg_token != settings.telegram_webhook_secret:
        raise HTTPException(status_code=403, detail="Invalid webhook secret")

    data = await request.json()
    cq = data.get("callback_query")
    if not cq:
        return {"ok": True}

    cb_data: str = cq.get("data", "")
    cq_id: str = cq.get("id", "")

    if not cb_data.startswith("status:"):
        return {"ok": True}

    parts = cb_data.split(":", 2)
    if len(parts) != 3:
        return {"ok": True}

    _, new_status, lead_id = parts
    if new_status not in LEAD_STATUSES:
        return {"ok": True}

    result = await session.execute(select(Lead).where(Lead.id == lead_id))
    lead = result.scalar_one_or_none()

    if not lead:
        await _answer_callback(cq_id, "Заявка не найдена")
        return {"ok": True}

    if lead.status == new_status:
        await _answer_callback(cq_id, "Статус уже установлен")
        return {"ok": True}

    from datetime import UTC, datetime
    lead.status = new_status
    lead.status_updated_at = datetime.now(UTC)
    await session.commit()

    await _notify_status_change(lead, new_status)

    from app.services.telegram import STATUS_RU
    label = STATUS_RU.get(new_status, new_status)
    await _answer_callback(cq_id, f"Статус обновлён: {label}")
    return {"ok": True}


async def _answer_callback(callback_query_id: str, text: str) -> None:
    try:
        bot = Bot(
            token=settings.telegram_bot_token,  # type: ignore[arg-type]
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        await bot.answer_callback_query(callback_query_id=callback_query_id, text=text)
        await bot.session.close()
    except Exception:
        logger.exception("Failed to answer callback query %s", callback_query_id)


@router.post("/set-webhook")
async def set_webhook(
    x_admin_token: str = Header(alias="X-Admin-Token"),
) -> dict:
    """Register the Telegram webhook URL. Call once after deploy."""
    if not settings.telegram_webhook_secret or x_admin_token != settings.telegram_webhook_secret:
        raise HTTPException(status_code=403, detail="Invalid admin token")
    if not settings.telegram_bot_token:
        raise HTTPException(status_code=500, detail="Telegram bot token not configured")
    if not settings.telegram_webhook_url:
        raise HTTPException(status_code=500, detail="TELEGRAM_WEBHOOK_URL not configured")

    bot = Bot(
        token=settings.telegram_bot_token,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML),
    )
    try:
        webhook_url = settings.telegram_webhook_url.rstrip("/") + "/api/telegram/webhook"
        await bot.set_webhook(
            url=webhook_url,
            secret_token=settings.telegram_webhook_secret,
        )
        info = await bot.get_webhook_info()
        return {"ok": True, "url": info.url, "pending_update_count": info.pending_update_count}
    finally:
        await bot.session.close()
