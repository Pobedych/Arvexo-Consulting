import logging

from aiogram import Bot
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from app.config import get_settings
from app.schemas import LeadCreate
from app.utils.security import escape_html, truncate_text

STATUS_RU = {
    "new":         "🆕 Новая",
    "contacted":   "📞 Связались",
    "in_progress": "🔵 В работе",
    "done":        "✅ Готово",
    "rejected":    "❌ Отклонена",
}

logger = logging.getLogger(__name__)


def _status_keyboard(lead_id: str, current_status: str) -> InlineKeyboardMarkup:
    statuses = [
        ("contacted",   "📞 Связались"),
        ("in_progress", "🔵 В работе"),
        ("done",        "✅ Готово"),
        ("rejected",    "❌ Отклонить"),
    ]
    buttons = [
        InlineKeyboardButton(
            text=f"· {label}" if status == current_status else label,
            callback_data=f"status:{status}:{lead_id}",
        )
        for status, label in statuses
        if status != current_status
    ]
    # Two buttons per row
    rows = [buttons[i : i + 2] for i in range(0, len(buttons), 2)]
    return InlineKeyboardMarkup(inline_keyboard=rows)


def _lead_text(lead: LeadCreate, lead_id: str, status: str = "new") -> str:
    task = truncate_text(lead.task)
    urgency_label = {"urgent": "🔴 Срочно", "standard": "🟢 Стандартно"}.get(lead.urgency or "", "")
    status_label = STATUS_RU.get(status, status)
    lines = [
        f"🚀 <b>Новая заявка с ai.arvexo.ru</b>",
        f"Статус: <b>{status_label}</b>",
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
    return "\n".join(lines)


async def send_lead_to_telegram(lead: LeadCreate, lead_id: str) -> tuple[bool, str | None, int | None]:
    """Send new lead notification. Returns (success, error, telegram_message_id)."""
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return False, "Telegram credentials are not configured", None

    bot: Bot | None = None
    try:
        bot = Bot(
            token=settings.telegram_bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        msg = await bot.send_message(
            chat_id=settings.telegram_chat_id,
            text=_lead_text(lead, lead_id),
            reply_markup=_status_keyboard(lead_id, "new"),
        )
        return True, None, msg.message_id
    except Exception as exc:
        logger.exception("Telegram notification failed")
        return False, str(exc), None
    finally:
        if bot is not None:
            await bot.session.close()


async def edit_lead_status_in_telegram(
    message_id: int,
    lead: LeadCreate,
    lead_id: str,
    new_status: str,
) -> None:
    """Edit the existing lead message to reflect the new status."""
    settings = get_settings()
    if not settings.telegram_bot_token or not settings.telegram_chat_id:
        return

    bot: Bot | None = None
    try:
        bot = Bot(
            token=settings.telegram_bot_token,
            default=DefaultBotProperties(parse_mode=ParseMode.HTML),
        )
        await bot.edit_message_text(
            chat_id=settings.telegram_chat_id,
            message_id=message_id,
            text=_lead_text(lead, lead_id, new_status),
            reply_markup=_status_keyboard(lead_id, new_status) if new_status not in ("done", "rejected") else None,
        )
    except Exception:
        logger.exception("Failed to edit Telegram message %s", message_id)
    finally:
        if bot is not None:
            await bot.session.close()


async def send_status_fallback_to_telegram(lead_name: str, lead_contact: str, new_status: str) -> None:
    """Fallback plain-text notification when no message_id is stored."""
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
