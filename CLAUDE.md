# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Landing page + lead capture backend for `ai.arvexo.ru`. Content is in Russian. The site is a single-page marketing site; leads submitted via the contact form are saved to PostgreSQL and forwarded to Telegram.

## Commands

### Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build
npm run lint
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # Unix
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Health check: `curl http://localhost:8000/health`

### Database (local Docker)

```bash
docker run --name arvexo-ai-postgres \
  -e POSTGRES_DB=arvexo_ai -e POSTGRES_USER=arvexo \
  -e POSTGRES_PASSWORD=change_me_password \
  -p 5432:5432 -d postgres:16-alpine
```

Set `DATABASE_URL=postgresql+asyncpg://arvexo:change_me_password@localhost:5432/arvexo_ai` in `.env`.

### Full stack

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

### Migrations

```bash
cd backend
alembic upgrade head
alembic revision --autogenerate -m "describe change"
```

## Architecture

### Frontend (`frontend/`)

Next.js 15 + TypeScript + TailwindCSS. Single-page layout — `app/page.tsx` assembles all section components in order. All marketing copy lives in `data/siteContent.ts`; edit there, not in components. The contact form in `components/ContactSection.tsx` calls `lib/api.ts → submitLead()` which POSTs to `NEXT_PUBLIC_API_BASE_URL/api/leads`. `lib/validation.ts` holds Zod schemas for the form. The `website` field is a honeypot — kept hidden, populated by bots.

### Backend (`backend/`)

FastAPI + SQLAlchemy async + asyncpg. Entry point: `app/main.py`. One router: `app/routers/leads.py` — `POST /api/leads`. Lead flow:
1. Honeypot check (`payload.website` filled → silent discard)
2. Rate limit check (`app/utils/rate_limit.py`)
3. Save `Lead` model to PostgreSQL
4. Send Telegram notification via `app/services/telegram.py` (aiogram)
5. Update `telegram_status` on the lead record (`sent` / `failed`)

Config via pydantic-settings (`app/config.py`). DB session factory in `app/database.py`.

### Nginx

Proxies `/` → frontend:3000, `/api/` and `/health` → backend:8000. Config at `nginx/nginx.conf`.

### Environment

Copy `.env.example` to `.env`. Required vars: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `POSTGRES_PASSWORD`. For production also set `NEXT_PUBLIC_API_BASE_URL=https://ai.arvexo.ru`, `CORS_ORIGINS`, and a strong `DATABASE_URL`.

## Verification checklist

```bash
cd frontend && npm run lint
cd frontend && npm run build
docker compose up --build -d && curl http://localhost:8000/health
```

Check mobile widths: 360px, 390px, 768px, 1024px, 1440px.
