import logging
from datetime import UTC, datetime, timedelta

import jwt
from fastapi import APIRouter, Cookie, HTTPException, Query
from fastapi.responses import JSONResponse, RedirectResponse

from app.config import get_settings
from app.services.account import AccountServiceError, exchange_sso_code

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/auth", tags=["auth"])
settings = get_settings()


def _create_session_token(user: dict) -> str:
    now = datetime.now(UTC)
    payload = {
        "sub": user["id"],
        "email": user.get("email"),
        "name": user.get("name"),
        "avatar_url": user.get("avatar_url"),
        "iat": now,
        "exp": now + timedelta(minutes=settings.session_ttl_minutes),
    }
    return jwt.encode(payload, settings.session_secret, algorithm="HS256")


def _decode_session_token(token: str) -> dict:
    return jwt.decode(token, settings.session_secret, algorithms=["HS256"])


def _set_session_cookie(response: JSONResponse | RedirectResponse, token: str) -> None:
    response.set_cookie(
        key=settings.session_cookie_name,
        value=token,
        httponly=True,
        secure=settings.session_cookie_secure,
        samesite="lax",
        max_age=settings.session_ttl_minutes * 60,
        path="/",
    )


@router.get("/callback")
async def auth_callback(
    code: str = Query(...),
    state: str | None = Query(default=None),
) -> RedirectResponse:
    try:
        result = await exchange_sso_code(code)
    except AccountServiceError as exc:
        logger.warning("SSO exchange failed: %s", exc)
        redirect = RedirectResponse(url=f"{settings.frontend_url}/login?error=sso_failed", status_code=302)
        return redirect

    user = result.get("account_user", {})
    token = _create_session_token(user)
    redirect = RedirectResponse(url=f"{settings.frontend_url}/account", status_code=302)
    _set_session_cookie(redirect, token)
    return redirect


@router.get("/me")
async def auth_me(
    consulting_session: str | None = Cookie(default=None),
) -> JSONResponse:
    token = consulting_session
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = _decode_session_token(token)
    except jwt.ExpiredSignatureError as exc:
        raise HTTPException(status_code=401, detail="Session expired") from exc
    except jwt.InvalidTokenError as exc:
        raise HTTPException(status_code=401, detail="Invalid session") from exc
    return JSONResponse(
        {
            "id": payload.get("sub"),
            "email": payload.get("email"),
            "name": payload.get("name"),
            "avatar_url": payload.get("avatar_url"),
        }
    )


@router.post("/logout")
async def auth_logout(
    consulting_session: str | None = Cookie(default=None),
) -> JSONResponse:
    response = JSONResponse({"ok": True})
    response.delete_cookie(key=settings.session_cookie_name, path="/")
    return response
