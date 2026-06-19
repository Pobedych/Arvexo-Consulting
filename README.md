# Arvexo AI Consulting

Production-ready landing page and backend for `ai.arvexo.ru`.

Stack:

- Frontend: Next.js, TypeScript, TailwindCSS
- Backend: FastAPI, SQLAlchemy async, asyncpg
- Database: PostgreSQL
- Migrations: Alembic
- Notifications: aiogram / Telegram
- Deployment: Docker Compose + Nginx

## Environment

Create local env file:

```bash
cp .env.example .env
```

Set real values for:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
POSTGRES_PASSWORD=
```

For production, use:

```env
NEXT_PUBLIC_API_BASE_URL=https://ai.arvexo.ru
DATABASE_URL=postgresql+asyncpg://arvexo:strong_password@postgres:5432/arvexo_ai
CORS_ORIGINS=https://ai.arvexo.ru
```

Do not commit real `.env` values.

## Frontend local run

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend local run

Start PostgreSQL locally or through Docker, then run:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Windows activation:

```bash
.venv\Scripts\activate
```

Health check:

```bash
curl http://localhost:8000/health
```

## PostgreSQL local option

```bash
docker run --name arvexo-ai-postgres \
  -e POSTGRES_DB=arvexo_ai \
  -e POSTGRES_USER=arvexo \
  -e POSTGRES_PASSWORD=change_me_password \
  -p 5432:5432 \
  -d postgres:16-alpine
```

Use local backend env:

```env
DATABASE_URL=postgresql+asyncpg://arvexo:change_me_password@localhost:5432/arvexo_ai
```

## Docker Compose

```bash
docker compose up --build -d
docker compose ps
docker compose logs -f
docker compose down
```

The backend container runs:

```bash
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

PostgreSQL uses a persistent `postgres_data` volume and is not exposed publicly by default.

## Telegram bot setup

1. Create a bot through BotFather.
2. Put the token into `TELEGRAM_BOT_TOKEN`.
3. Get your chat id and put it into `TELEGRAM_CHAT_ID`.
4. Send a test lead through the form or curl.

If Telegram is unavailable or credentials are missing, the API still saves the lead and marks `telegram_status = failed`.

## Lead endpoint test

```bash
curl -X POST http://localhost:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "contact": "@test",
    "company": "Test Company",
    "task": "Хочу автоматизировать обработку заявок с сайта и Telegram.",
    "budget": "Пока не знаю",
    "website": "",
    "privacyConsent": true
  }'
```

Honeypot test:

```bash
curl -X POST http://localhost:8000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Spam User",
    "contact": "spam",
    "task": "Хочу автоматизировать заявки с сайта.",
    "website": "https://spam.example",
    "privacyConsent": true
  }'
```

This returns success, but does not save the lead and does not send Telegram notification.

## Migrations

Run migrations manually:

```bash
cd backend
alembic upgrade head
```

Create a new migration after model changes:

```bash
alembic revision --autogenerate -m "describe change"
```

## VPS deployment

1. Point DNS `ai.arvexo.ru` to the VPS IP.
2. Install Docker and Docker Compose plugin.
3. Copy the project to the server.
4. Create `.env` from `.env.example`.
5. Set production `NEXT_PUBLIC_API_BASE_URL=https://ai.arvexo.ru`.
6. Run:

```bash
docker compose up --build -d
docker compose ps
```

Nginx listens on port `80` and proxies:

- `/` to frontend
- `/api/` to backend with path preserved
- `/health` to backend health

## SSL

SSL certificates are not embedded into the initial Nginx config. For production, issue certificates with Certbot or use Caddy/Traefik in front of the services.

## Verification

```bash
cd frontend && npm run lint
cd frontend && npm run build
docker compose up --build -d
docker compose ps
curl http://localhost:8000/health
```

Also verify the landing page at mobile widths `360px`, `390px`, `768px`, `1024px`, and desktop `1440px`.
