import html
import ipaddress

from fastapi import Request

from app.config import get_settings


def escape_html(value: str | None) -> str:
    return html.escape(value or "", quote=True)


def truncate_text(value: str, max_length: int = 1800) -> str:
    if len(value) <= max_length:
        return value
    return value[: max_length - 1].rstrip() + "…"


def _is_trusted_proxy(ip: str) -> bool:
    settings = get_settings()
    try:
        address = ipaddress.ip_address(ip)
    except ValueError:
        return False

    for network in settings.trusted_proxy_ip_list:
        try:
            if address in ipaddress.ip_network(network, strict=False):
                return True
        except ValueError:
            if ip == network:
                return True
    return False


def get_client_ip(request: Request) -> str | None:
    direct_ip = request.client.host if request.client else None
    if not direct_ip:
        return None

    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for and _is_trusted_proxy(direct_ip):
        first_ip = forwarded_for.split(",")[0].strip()
        if first_ip:
            return first_ip[:100]

    real_ip = request.headers.get("x-real-ip")
    if real_ip and _is_trusted_proxy(direct_ip):
        return real_ip[:100]

    return direct_ip[:100]
