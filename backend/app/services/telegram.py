import logging

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from app.config import get_settings
from app.schemas import LeadCreate
from app.utils.security import escape_html, truncate_text

STATUS_RU = {
    "new": "Новая",
    "contacted": "Связались",
    "in_progress": "В работе",
    "done": "Выполнена",
    "rejected": "Отклонена",
}

logger = logging.getLogger(__name__)


async def send_lead_to_telegram(lead: LeadCreate) -> tuple[bool, str | None]:
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return False, "Telegram credentials are not configured"

    task = truncate_text(lead.task)
    urgency_label = {"urgent": "🔴 Срочно", "standard": "🟢 Стандартно"}.get(lead.urgency or "", "")
    lines = [
        "🚀 <b>Новая заявка с ai.arvexo.ru</b>",
        "",
        f"Имя: {escape_html(lead.name)}",
        f"Контакт: {escape_html(lead.contact)}",
        f"Компания: {escape_html(lead.company or 'Не указана')}",
        f"Бюджет: {escape_html(lead.budget or 'Не указан')}",
    ]
    if lead.service_type:
        lines.append(f"Тип: {escape_html(lead.service_type)}")
    if urgency_label:
        lines.append(f"Срочность: {urgency_label}")
    lines += ["", "<b>Задача:</b>", escape_html(task)]
    message = "\n".join(lines)

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


async def send_status_update_to_telegram(lead_name: str, lead_contact: str, new_status: str) -> None:
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return
    label = STATUS_RU.get(new_status, new_status)
    message = (
        f"🔄 <b>Статус заявки обновлён</b>\n\n"
        f"Клиент: {escape_html(lead_name)}\n"
        f"Контакт: {escape_html(lead_contact)}\n"
        f"Новый статус: <b>{escape_html(label)}</b>"
    )
    bot: Bot | None = None
    try:
        bot = Bot(
            token=settings.telegram_bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        await bot.send_message(chat_id=settings.telegram_chat_id, text=message)
    except Exception:
        logger.exception("Status update Telegram notification failed")
    finally:
        if bot is not None:
            await bot.session.close()
