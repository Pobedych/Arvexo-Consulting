import httpx

from app.config import get_settings

settings = get_settings()


class AccountServiceError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)
        self.status_code = status_code


async def exchange_sso_code(code: str) -> dict:
    """Exchange SSO code from Arvexo Account for user profile."""
    payload = {
        "client_id": settings.account_client_id,
        "client_secret": settings.account_client_secret,
        "code": code,
        "redirect_uri": settings.account_redirect_uri,
    }
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.post(f"{settings.account_api_url}/sso/exchange", json=payload)

    if resp.status_code == 200:
        return resp.json()

    try:
        detail = resp.json().get("error", {}).get("message", "SSO exchange failed")
    except Exception:
        detail = "SSO exchange failed"
    raise AccountServiceError(detail, resp.status_code)
