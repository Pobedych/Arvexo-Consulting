import logging

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from app.config import get_settings
from app.schemas import LeadCreate
from app.utils.security import escape_html, truncate_text

logger = logging.getLogger(__name__)


async def send_lead_to_telegram(lead: LeadCreate) -> tuple[bool, str | None]:
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return False, "Telegram credentials are not configured"

    task = truncate_text(lead.task)
    message = (
        "🚀 <b>Новая заявка с ai.arvexo.ru</b>\n\n"
        f"Имя: {escape_html(lead.name)}\n"
        f"Контакт: {escape_html(lead.contact)}\n"
        f"Компания: {escape_html(lead.company or 'Не указана')}\n"
        f"Бюджет: {escape_html(lead.budget or 'Не указан')}\n\n"
        f"<b>Задача:</b>\n{escape_html(task)}"
    )

    bot: Bot | None = None
    try:
        bot = Bot(
            token=settings.telegram_bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        await bot.send_message(chat_id=settings.telegram_chat_id, text=message)
        return True, None
    except Exception as exc:  # Telegram should not break lead acceptance.
        logger.exception("Telegram notification failed")
        return False, str(exc)
    finally:
        if bot is not None:
            await bot.session.close()
