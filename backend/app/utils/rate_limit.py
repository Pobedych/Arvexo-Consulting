from collections import defaultdict, deque
from time import monotonic

from fastapi import HTTPException, Request, status

from app.utils.security import get_client_ip

# Lead submission: 5 per 10 minutes per IP
LEAD_WINDOW = 10 * 60
LEAD_MAX = 5

# Admin mutations: 120 per minute per IP (brute-force protection, admins are authenticated)
ADMIN_WINDOW = 60
ADMIN_MAX = 120

_lead_requests: dict[str, deque[float]] = defaultdict(deque)
_admin_requests: dict[str, deque[float]] = defaultdict(deque)


def _check(bucket_store: dict[str, deque[float]], key: str, window: int, max_req: int, detail: str) -> None:
    now = monotonic()
    bucket = bucket_store[key]
    while bucket and now - bucket[0] > window:
        bucket.popleft()
    if len(bucket) >= max_req:
        raise HTTPException(status_code=status.HTTP_429_TOO_MANY_REQUESTS, detail=detail)
    bucket.append(now)


def check_rate_limit(request: Request) -> None:
    key = get_client_ip(request) or "unknown"
    _check(_lead_requests, key, LEAD_WINDOW, LEAD_MAX, "Too many lead requests. Please try again later.")


def check_admin_rate_limit(request: Request) -> None:
    key = get_client_ip(request) or "unknown"
    _check(_admin_requests, key, ADMIN_WINDOW, ADMIN_MAX, "Too many requests. Please slow down.")
