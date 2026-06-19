from collections import defaultdict, deque
from time import monotonic

from fastapi import HTTPException, Request, status

from app.utils.security import get_client_ip

WINDOW_SECONDS = 10 * 60
MAX_REQUESTS = 5

_requests: dict[str, deque[float]] = defaultdict(deque)


def check_rate_limit(request: Request) -> None:
    client_ip = get_client_ip(request) or "unknown"
    now = monotonic()
    bucket = _requests[client_ip]

    while bucket and now - bucket[0] > WINDOW_SECONDS:
        bucket.popleft()

    if len(bucket) >= MAX_REQUESTS:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Too many lead requests. Please try again later.",
        )

    bucket.append(now)
