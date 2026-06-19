# ТЗ для Codex: production-ready сайт Arvexo AI Consulting

## 0. Важный контекст

Нужно разработать production-ready сайт для направления **Arvexo AI Consulting**.

Проект должен быть готов к деплою на VPS/server через Docker.

Домен проекта:

```txt
ai.arvexo.ru
```

Технологический стек:

```txt
Frontend: Next.js + TypeScript + TailwindCSS
Backend: FastAPI + Python
Database: PostgreSQL
ORM / DB layer: SQLAlchemy 2.x async + asyncpg
Migrations: Alembic
Telegram notifications: aiogram
Deployment: Docker + Docker Compose + Nginx reverse proxy
```

Главная задача: сделать не демо-страницу, а аккуратный, чистый, B2B-oriented landing page с рабочей backend-частью, сохранением заявок в PostgreSQL и уведомлениями в Telegram.

---

## 1. Референсы для разработки

Использовать следующие ссылки **только как референсы для дизайна, структуры, визуального вайба, композиции и UX**.

На самом сайте эти ссылки, названия шаблонов, Wix и skills.sh **не упоминать**.

### Wix design references

```txt
https://ru.wix.com/website-template/view/html/wh-1142?originUrl=https%3A%2F%2Fru.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fbusiness%2Fconsulting-coaching&tpClick=view_button&esi=7e7dbf30-75d3-411f-bd86-04b7bb0c3873

https://ru.wix.com/website-template/view/html/2958?originUrl=https%3A%2F%2Fru.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fbusiness%2Fconsulting-coaching&tpClick=view_button&esi=62611a4e-6d90-40c5-9e52-894e8ebb9f78

https://ru.wix.com/website-template/view/html/wh-1128?originUrl=https%3A%2F%2Fru.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fbusiness%2Fconsulting-coaching&tpClick=view_button&esi=760e0527-9e0f-44c0-9b52-8d13b98b7ab2

https://ru.wix.com/website-template/view/html/wh-1256?originUrl=https%3A%2F%2Fru.wix.com%2Fwebsite%2Ftemplates%2Fhtml%2Fbusiness%2Fconsulting-coaching%2F2&tpClick=view_button&esi=6b45fe7f-617c-48e6-bfeb-78cba9448773
```

### Важное требование по дизайну

Codex должен **внимательно ориентироваться на указанные Wix-шаблоны** и примерно повторить:

```txt
общий consulting/coaching вайб
логику hero-блока
крупную типографику
много воздуха
спокойную премиальную палитру
чистые секции
аккуратные карточки
структуру B2B landing page
ритм отступов
мягкие CTA-блоки
```

Не нужно делать pixel-perfect copy конкретного шаблона. Нужно сделать оригинальный сайт Arvexo AI Consulting, но визуально близкий по уровню, настроению, чистоте и композиции к указанным референсам.

Запрещено:

```txt
копировать чужие логотипы
оставлять упоминания Wix
оставлять упоминания skills.sh
использовать изображения/ассеты из шаблонов напрямую
делать сайт в стиле киберпанк, крипто, dark neon или generic AI robot
```

### Agent skills reference

Использовать как технический референс для понимания агентных skills/workflows:

```txt
https://www.skills.sh/vercel-labs/skills/find-skills
```

Важно:

```txt
не писать на сайте про skills.sh
не писать на сайте про Wix
не писать на сайте “мы используем этот skill”
можно использовать идею агентных навыков в архитектуре и текстах, но бизнесовым языком
на сайте говорить не про конкретный skills.sh, а про AI-агентов, автоматизацию и бизнес-процессы
```

---

## 2. Цель сайта

Создать современный B2B landing page для **AI-консалтинга и автоматизации бизнес-процессов**.

Главная цель:

```txt
Пользователь должен быстро понять, что Arvexo помогает бизнесу находить процессы для автоматизации и внедрять AI-решения: ботов, ассистентов, интеграции, аналитику и автоматизацию заявок.
```

Вторая цель:

```txt
Получить заявку через форму, отправить её на backend, сохранить заявку в PostgreSQL и переслать уведомление в Telegram через aiogram.
```

Третья цель:

```txt
Сайт должен выглядеть достаточно серьёзно для B2B-клиентов: без ощущения шаблонной AI-страницы, без дешёвого визуала, без хаотичных эффектов.
```

---

## 3. Структура репозитория

Сделать monorepo-структуру:

```txt
arvexo-ai-consulting/
  frontend/
    app/
      page.tsx
      layout.tsx
      globals.css
      privacy/
        page.tsx
      terms/
        page.tsx
    components/
      Header.tsx
      Hero.tsx
      ProblemSection.tsx
      ServicesSection.tsx
      AgentCapabilitiesSection.tsx
      ProcessSection.tsx
      SolutionsSection.tsx
      AudienceSection.tsx
      AuditOutputSection.tsx
      WhyArvexoSection.tsx
      FAQSection.tsx
      ContactSection.tsx
      Footer.tsx
      SectionTitle.tsx
      Button.tsx
      Card.tsx
      MobileMenu.tsx
      WorkflowMockup.tsx
    data/
      siteContent.ts
    lib/
      api.ts
      validation.ts
    public/
    styles/
    Dockerfile
    .dockerignore
    next.config.ts
    package.json
    tsconfig.json
    tailwind.config.ts
    postcss.config.js
  backend/
    app/
      main.py
      config.py
      schemas.py
      database.py
      models.py
      routers/
        leads.py
      services/
        telegram.py
      utils/
        rate_limit.py
        security.py
    alembic/
      versions/
    alembic.ini
    requirements.txt
    Dockerfile
    .dockerignore
  nginx/
    nginx.conf
  docker-compose.yml
  .env.example
  README.md
```

---

## 4. Frontend requirements

Использовать:

```txt
Next.js App Router
TypeScript
TailwindCSS
React Server Components where appropriate
Client components where interactivity is needed
```

Можно использовать:

```txt
lucide-react
framer-motion
```

Не использовать:

```txt
jQuery
Bootstrap
тяжёлые UI-киты
сложные CMS
лишние зависимости
```

Общие требования:

```txt
код должен быть typed
контент должен быть вынесен в data/siteContent.ts
повторяющиеся карточки должны рендериться через массивы и .map()
форма должна быть отдельным client component
API-клиент должен быть вынесен в lib/api.ts
```

---

## 5. Frontend pages

Нужна одна основная страница:

```txt
/
```

Она должна быть landing page.

Дополнительно подготовить страницы:

```txt
/privacy
/terms
```

Важно: это не должны быть пустые заглушки. Нужен минимальный, но нормальный текст.

### /privacy

Страница должна коротко объяснять:

```txt
какие данные собираются через форму
для чего собираются данные
что данные сохраняются для обработки заявки
что данные могут отправляться в Telegram-уведомление владельцу проекта
как запросить удаление данных
контакт для вопросов по данным
```

### /terms

Страница должна коротко объяснять:

```txt
что сайт предоставляет информацию об AI-консалтинге
что отправка формы не является заключением договора
что условия проекта обсуждаются индивидуально
что владелец сайта может обновлять условия
```

Можно оставить TODO-комментарий в коде, что юридический текст нужно заменить на полноценный позже, но пользователю на сайте не показывать слово TODO.

---

## 6. Frontend components

Создать компоненты:

```txt
components/
  Header.tsx
  Hero.tsx
  ProblemSection.tsx
  ServicesSection.tsx
  AgentCapabilitiesSection.tsx
  ProcessSection.tsx
  SolutionsSection.tsx
  AudienceSection.tsx
  AuditOutputSection.tsx
  WhyArvexoSection.tsx
  FAQSection.tsx
  ContactSection.tsx
  Footer.tsx
  SectionTitle.tsx
  Button.tsx
  Card.tsx
  MobileMenu.tsx
  WorkflowMockup.tsx
```

Контент вынести в:

```txt
data/siteContent.ts
```

Карточки, FAQ, услуги, шаги процесса, решения, аудит-результаты и аудитории должны рендериться через массивы и `.map()`.

---

## 7. Design style

Сайт должен визуально напоминать современные consulting/coaching/B2B SaaS шаблоны из указанных референсов.

Основные характеристики:

```txt
много воздуха
крупная типографика
чистые секции
аккуратные карточки
спокойная палитра
премиальный consulting vibe
лёгкий technological feeling
минималистичные mockup-блоки
понятная структура для B2B-клиента
```

Цвета:

```txt
background: #F7F5F0 или #FAFAF7
main text: #111111
secondary text: #5F6368
accent: #1D4ED8
accent secondary: #4F46E5
card background: #FFFFFF
border: #E5E7EB
success: #16A34A
error: #DC2626
```

Рекомендованные layout-параметры:

```txt
container max-width: 1120px или 1200px
section padding desktop: 88px-112px по вертикали, 24px по горизонтали
section padding mobile: 56px-72px по вертикали, 20px по горизонтали
card border-radius: 20px-28px
buttons border-radius: 999px или 14px-18px
hero title: крупный, примерно 52-72px на desktop, 38-44px на mobile
body text: 16-18px
```

Не делать:

```txt
киберпанк
роботов
кислотные градиенты
крипто-стиль
перегруженный тёмный фон
дешёвые stock AI-картинки
случайные 3D-иллюстрации мозга/робота
слишком много анимаций
```

---

## 8. Visual assets

Не использовать случайные картинки роботов.

Визуал должен быть собран внутри интерфейса через UI-блоки, карточки, иконки и mockup-элементы.

Главный визуальный стиль:

```txt
business process automation
AI workflow cards
dashboard-like blocks
clean consulting layout
minimal SaaS interface
premium coaching/consulting composition
```

В hero справа сделать UI-mockup из карточек:

```txt
Новая заявка
AI определил потребность
Данные переданы менеджеру
CRM обновлена
Ответ подготовлен
```

Можно использовать:

```txt
lucide-react icons
CSS gradients
soft shadows
rounded cards
minimal lines
dashboard widgets
subtle animated transitions
```

На сайте не должно быть внешних логотипов Wix, skills.sh или упоминаний этих источников.

---

## 9. Header

Логотип:

```txt
Arvexo AI
```

Навигация:

```txt
Задачи
Услуги
AI-агенты
Как работаем
Решения
FAQ
```

CTA:

```txt
Обсудить проект
```

Поведение:

```txt
sticky header
smooth scroll
mobile burger menu
active hover states
header должен выглядеть чисто и премиально, как в consulting/SaaS templates
```

CTA скроллит к секции:

```txt
#contact
```

---

## 10. Hero section

H1:

```txt
AI-консалтинг и автоматизация для бизнеса
```

Subtitle:

```txt
Помогаем компаниям внедрять AI в продажи, поддержку, аналитику и внутренние процессы: от аудита и прототипа до полноценной интеграции.
```

CTA buttons:

```txt
Обсудить проект
Посмотреть услуги
```

Microcopy:

```txt
AI-аудит · Telegram-боты · CRM-интеграции · внутренние ассистенты · автоматизация заявок
```

Right visual:

UI-workflow mockup:

```txt
Новая заявка от клиента
AI определил потребность
Данные переданы менеджеру
CRM обновлена
Ответ подготовлен
```

Hero должен быть похож по композиции на современные consulting/coaching templates: крупный заголовок, короткий текст, две CTA-кнопки, спокойный визуал справа, много воздуха.

---

## 11. ProblemSection

id:

```txt
problems
```

Title:

```txt
Где бизнес теряет время каждый день
```

Subtitle:

```txt
AI полезен не сам по себе, а там, где есть повторяющиеся действия, ручная обработка данных и потерянные заявки.
```

Cards:

```txt
Ручная обработка заявок — Менеджеры тратят время на одинаковые вопросы, уточнения и первичную квалификацию клиентов.

Потерянные сообщения — Заявки остаются в Telegram, почте, таблицах и чатах, но не попадают в единую систему.

Долгий поиск информации — Сотрудники ищут ответы в документах, регламентах и переписках вместо быстрой работы с клиентами.

Нет понятной аналитики — Бизнес видит заявки и продажи, но не всегда понимает, где теряются клиенты и что можно улучшить.
```

---

## 12. ServicesSection

id:

```txt
services
```

Title:

```txt
Что мы внедряем
```

Subtitle:

```txt
От короткого AI-аудита до полноценного MVP с интеграциями в ваши сервисы.
```

Cards:

```txt
AI-аудит бизнеса
Анализируем процессы компании и находим, где AI может реально сэкономить время, деньги или ресурсы команды.
- Разбор текущих процессов
- Поиск ручной рутины
- Карта автоматизации
- Оценка сложности внедрения
- План MVP

AI-боты для клиентов
Разрабатываем ботов для продаж, поддержки, записи, консультаций и обработки заявок.
- Telegram-боты
- Боты для сайта
- Боты для онлайн-школ
- Боты для сервисного бизнеса

Внутренние AI-ассистенты
Создаём ассистентов для сотрудников, которые работают с документами, базой знаний, инструкциями и внутренними материалами.
- Ассистент по регламентам
- Помощник отдела продаж
- AI-поддержка сотрудников
- Поиск ответов по базе знаний

Интеграции и автоматизация
Подключаем AI к Telegram, CRM, таблицам, базам данных, сайту и внутренним сервисам через API.
- Telegram
- CRM
- Google Sheets
- Базы данных
- API
```

---

## 13. AgentCapabilitiesSection

id:

```txt
agents
```

На сайте эту секцию можно называть:

```txt
AI-агенты под конкретные задачи бизнеса
```

Не писать про skills.sh.

Title:

```txt
AI-агенты под конкретные задачи бизнеса
```

Subtitle:

```txt
Собираем AI-решения не как один универсальный чат, а как систему с отдельными возможностями: поиск информации, анализ данных, обработка заявок, генерация ответов и интеграции с сервисами.
```

Cards:

```txt
Поиск информации — AI помогает находить нужные ответы в базе знаний, документах или открытых источниках.

Анализ данных — AI классифицирует обращения, выделяет частые вопросы и ищет закономерности в заявках.

Коммуникация — AI готовит ответы клиентам, уточняет данные и передаёт сложные случаи сотруднику.

Интеграции — AI передаёт данные в Telegram, CRM, таблицы или внутренние сервисы через API.

Автоматизация действий — AI запускает цепочки: собрать заявку, проверить данные, создать запись и уведомить менеджера.
```

Можно добавить маленький бейдж:

```txt
AI workflows
```

Но не использовать слова `skills.sh`.

---

## 14. ProcessSection

id:

```txt
process
```

Title:

```txt
От идеи до рабочего AI-решения
```

Steps:

```txt
1. Разбираем задачу
Обсуждаем бизнес, процессы, текущие инструменты и главные проблемы.

2. Проводим AI-аудит
Определяем, какие процессы можно автоматизировать и где будет максимальная польза.

3. Проектируем решение
Описываем сценарии, интеграции, роли пользователя и логику работы AI.

4. Собираем MVP
Создаём первую рабочую версию: бот, ассистент, интеграция или внутренний инструмент.

5. Внедряем и улучшаем
Подключаем решение к реальным процессам, собираем обратную связь и дорабатываем.
```

---

## 15. SolutionsSection

id:

```txt
solutions
```

Title:

```txt
Какие решения можно запустить
```

Cards:

```txt
AI-консультант на сайте — Отвечает на вопросы клиентов, помогает выбрать услугу и передаёт заявку менеджеру.

Telegram-бот для заявок — Собирает данные клиента, квалифицирует обращение и отправляет информацию в нужный канал.

Ассистент по базе знаний — Помогает сотрудникам быстро находить ответы в документах, инструкциях и регламентах.

AI-анализ обращений — Классифицирует заявки, выявляет частые проблемы и помогает улучшать поддержку или продажи.

Автоматизация отчётов — Собирает данные из таблиц, формирует выводы и помогает быстрее принимать решения.

AI-помощник для онлайн-школы — Отвечает ученикам, помогает с материалами, собирает обратную связь и передаёт сложные вопросы куратору.
```

---

## 16. AudienceSection

id:

```txt
audience
```

Title:

```txt
Для кого подходит Arvexo AI Consulting
```

Subtitle:

```txt
Лучше всего AI-автоматизация работает там, где уже есть поток обращений, повторяющиеся вопросы, ручные операции и данные в разных сервисах.
```

Cards:

```txt
Онлайн-школы — AI помогает отвечать ученикам, собирать обратную связь, передавать сложные вопросы кураторам и автоматизировать поддержку.

Сервисные компании — Боты и ассистенты помогают принимать заявки, уточнять детали, напоминать о записи и передавать данные менеджерам.

Отделы продаж — AI помогает квалифицировать лиды, готовить ответы, фиксировать данные в CRM и не терять обращения.

Поддержка клиентов — AI может отвечать на частые вопросы, искать ответы в базе знаний и передавать сложные случаи сотруднику.

Эксперты и консалтинг — AI помогает обрабатывать заявки, готовить первичные ответы и структурировать коммуникацию с клиентами.

Малый и средний бизнес — Можно начать с небольшого MVP без сложной корпоративной инфраструктуры.
```

---

## 17. AuditOutputSection

id:

```txt
audit-output
```

Title:

```txt
Что вы получаете после AI-аудита
```

Subtitle:

```txt
Аудит нужен не ради отчёта, а чтобы понять, где AI действительно окупится и какое решение стоит запускать первым.
```

Items:

```txt
Карта бизнес-процессов
Список точек автоматизации
Оценка сложности внедрения
План MVP
Рекомендации по инструментам
Архитектура первого решения
Приоритеты: что делать сейчас, что позже
```

---

## 18. WhyArvexoSection

id:

```txt
why
```

Title:

```txt
Без магии, воды и “AI ради AI”
```

Text:

```txt
Мы не продаём абстрактную цифровую трансформацию. Мы разбираем конкретный процесс, проектируем решение, разрабатываем прототип и внедряем его в реальную работу бизнеса.
```

Benefits:

```txt
Фокус на практической пользе
Быстрый запуск MVP
Понятная архитектура
Опыт в backend, Telegram-ботах, API и инфраструктуре
Возможность начать с небольшого проекта
Доработка решения после запуска
```

---

## 19. FAQSection

id:

```txt
faq
```

Сделать accordion.

FAQ:

```txt
Сколько стоит AI-консалтинг?
Стоимость зависит от задачи. Можно начать с короткого аудита или MVP, а затем расширять решение.

Можно ли начать без большого бюджета?
Да. Оптимальный подход — сначала сделать небольшой прототип и проверить пользу на реальном процессе.

Вы делаете только консультации или разработку тоже?
Направление включает и консультации, и разработку: аудит, проектирование, MVP, интеграции и поддержку.

Можно ли подключить AI к Telegram или CRM?
Да. Возможны интеграции с Telegram, CRM, таблицами, сайтом, базами данных и внутренними сервисами.

Это безопасно для данных компании?
Для каждого проекта отдельно определяется, какие данные используются, где они хранятся и какие ограничения по доступу нужны.

Сохраняются ли заявки с сайта?
Да. Заявки сохраняются в PostgreSQL и дополнительно отправляются владельцу проекта в Telegram.
```

---

## 20. ContactSection

id:

```txt
contact
```

Title:

```txt
Хотите понять, где AI поможет вашему бизнесу?
```

Text:

```txt
Опишите задачу в свободной форме. Мы подскажем, какой формат решения подойдёт: аудит, бот, ассистент, интеграция или MVP.
```

Form fields:

```txt
name: string, required
contact: string, required
company: string, optional
task: string, required
budget: string, optional
website: string, hidden honeypot field
privacyConsent: boolean, required
```

Budget options:

```txt
Пока не знаю
До 50 000 ₽
50 000–150 000 ₽
150 000–300 000 ₽
300 000 ₽+
```

Privacy consent checkbox:

```txt
Я согласен на обработку персональных данных и принимаю политику конфиденциальности.
```

Button:

```txt
Получить консультацию
```

Frontend form behavior:

```txt
validate required fields
validate privacy consent
show field errors
send POST request to backend endpoint /api/leads
show loading state
show success state after successful request
show error state after failed request
disable submit button while loading
disable submit button until privacy consent is checked
include hidden honeypot field named website
```

---

## 21. API URL rule

Использовать одну переменную:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Frontend должен отправлять заявку на:

```ts
`${NEXT_PUBLIC_API_BASE_URL}/api/leads`
```

Production value:

```env
NEXT_PUBLIC_API_BASE_URL=https://ai.arvexo.ru
```

Local value:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Важно:

```txt
Не использовать https://ai.arvexo.ru/api как base URL, чтобы не получить /api/api/leads.
```

Если `NEXT_PUBLIC_API_BASE_URL` не задан, frontend должен использовать same-origin fallback:

```ts
fetch('/api/leads')
```

---

## 22. Backend requirements

Backend на FastAPI.

Создать endpoint:

```txt
POST /api/leads
```

Request body:

```json
{
  "name": "string",
  "contact": "string",
  "company": "string | null",
  "task": "string",
  "budget": "string | null",
  "website": "string | null",
  "privacyConsent": true
}
```

Validation:

```txt
name required, min length 2, max length 100
contact required, min length 3, max length 150
task required, min length 10, max length 3000
company optional, max length 150
budget optional, must be one of allowed values
website optional, max length 200
privacyConsent must be true
```

Response success:

```json
{
  "ok": true,
  "message": "Lead received"
}
```

Response error:

```json
{
  "ok": false,
  "detail": "Validation error or server error"
}
```

Backend должен:

```txt
validate data with Pydantic
save valid lead to PostgreSQL before Telegram notification
send lead notification to Telegram via aiogram
return JSON response
handle Telegram errors gracefully
not expose bot token
support CORS for frontend domain
log important errors
not crash if Telegram is unavailable
```

---

## 23. PostgreSQL requirements

PostgreSQL обязателен. Не оставлять базу как TODO.

Использовать:

```txt
PostgreSQL
SQLAlchemy 2.x async
asyncpg
Alembic migrations
```

Создать модель `Lead`.

Recommended table:

```txt
leads
  id: UUID primary key
  name: varchar(100), not null
  contact: varchar(150), not null
  company: varchar(150), nullable
  task: text, not null
  budget: varchar(50), nullable
  source: varchar(100), default "ai.arvexo.ru"
  ip_address: varchar(100), nullable
  user_agent: text, nullable
  privacy_consent: boolean, not null, default true
  telegram_status: varchar(30), default "pending"
  telegram_error: text, nullable
  created_at: timestamp with timezone, default now()
  updated_at: timestamp with timezone, default now()
```

Lead processing logic:

```txt
1. Validate request body.
2. If honeypot field website is filled, return success without saving to DB and without Telegram notification.
3. If request is valid and not honeypot, save lead to PostgreSQL.
4. Try to send Telegram notification.
5. If Telegram success, update telegram_status = "sent".
6. If Telegram failed, update telegram_status = "failed" and save telegram_error.
7. Return success if lead was accepted and saved, even if Telegram failed.
```

Alembic:

```txt
Create initial migration for leads table.
README must explain how to run migrations.
Backend container should run migrations on startup or README must clearly explain migration command.
```

Preferred startup behavior:

```txt
backend runs alembic upgrade head before uvicorn starts
```

---

## 24. Telegram notifications via aiogram

Использовать aiogram для отправки уведомления в Telegram.

Env variables:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Формат сообщения:

```txt
🚀 Новая заявка с ai.arvexo.ru

Имя: {name}
Контакт: {contact}
Компания: {company or "Не указана"}
Бюджет: {budget or "Не указан"}

Задача:
{task}
```

Требования:

```txt
HTML-escape user input before sending to Telegram
truncate task safely if message is too long
use parse_mode="HTML" only if all user input is escaped
do not crash API if Telegram request failed
log Telegram errors
update telegram_status in PostgreSQL
return 200 only if backend accepted and saved the lead
```

---

## 25. Backend project structure

```txt
backend/
  app/
    main.py
    config.py
    schemas.py
    database.py
    models.py
    routers/
      leads.py
    services/
      telegram.py
    utils/
      rate_limit.py
      security.py
  alembic/
    versions/
  alembic.ini
  requirements.txt
  Dockerfile
  .dockerignore
```

`config.py`:

```txt
load settings from env using pydantic-settings
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
CORS_ORIGINS
DATABASE_URL
ENVIRONMENT
```

`schemas.py`:

```txt
LeadCreate
LeadResponse
```

`database.py`:

```txt
create async SQLAlchemy engine
create async session dependency
```

`models.py`:

```txt
Lead SQLAlchemy model
```

`routers/leads.py`:

```txt
POST /api/leads
```

`services/telegram.py`:

```txt
send_lead_to_telegram(data)
```

`utils/security.py`:

```txt
HTML escaping
safe truncation
client IP extraction
```

`main.py`:

```txt
create FastAPI app
setup CORS
include leads router
add health endpoint GET /health
```

Health endpoint:

```json
{
  "status": "ok",
  "database": "ok"
}
```

---

## 26. Rate limiting / spam protection

Добавить простую защиту от спама.

Минимально:

```txt
rate limit by IP in memory
max 5 lead requests per 10 minutes per IP
```

Также на frontend добавить hidden honeypot field:

```txt
website
```

Если поле заполнено:

```txt
backend returns success
backend does not save lead
backend does not send Telegram notification
```

Важно:

```txt
Rate limiter must use X-Forwarded-For correctly behind Nginx.
Do not trust arbitrary headers blindly outside proxy context; implement simple but safe extraction.
```

---

## 27. Docker

Создать Dockerfile для frontend:

```txt
frontend/Dockerfile
```

Требования:

```txt
multi-stage build
install dependencies
build Next.js app
run production server
expose 3000
use npm ci if package-lock.json exists
```

Создать Dockerfile для backend:

```txt
backend/Dockerfile
```

Требования:

```txt
install Python dependencies
run alembic upgrade head on startup
run FastAPI with uvicorn
expose 8000
```

Создать:

```txt
docker-compose.yml
```

Services:

```txt
frontend
backend
postgres
nginx
```

Ports:

```txt
nginx: 80:80 and optionally 443:443
frontend internal: 3000
backend internal: 8000
postgres internal: 5432, do not expose publicly by default
```

Add:

```txt
restart: unless-stopped
postgres volume for persistent data
backend depends_on postgres
healthcheck for postgres
healthcheck for backend via /health
```

Frontend should use:

```txt
NEXT_PUBLIC_API_BASE_URL=https://ai.arvexo.ru in production
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000 locally
```

---

## 28. Nginx

Создать:

```txt
nginx/nginx.conf
```

Nginx должен:

```txt
listen 80
server_name ai.arvexo.ru

proxy / to frontend:3000
proxy /api/ to backend:8000
proxy /health to backend:8000/health
```

Важно использовать сохранение path для API.

Recommended config logic:

```nginx
location /api/ {
    proxy_pass http://backend:8000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

Важно:

```txt
Do not accidentally rewrite /api/leads into /leads.
location /api/ should preserve path.
support WebSocket headers just in case.
set proxy headers Host, X-Real-IP, X-Forwarded-For, X-Forwarded-Proto.
```

SSL можно не настраивать внутри nginx-конфига, но добавить комментарий в README, что SSL лучше выпустить через certbot или поставить Caddy/Traefik.

---

## 29. Environment variables

Создать `.env.example`:

```env
# Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# Backend
ENVIRONMENT=development
DATABASE_URL=postgresql+asyncpg://arvexo:change_me_password@postgres:5432/arvexo_ai
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
CORS_ORIGINS=http://localhost:3000,https://ai.arvexo.ru

# PostgreSQL container
POSTGRES_DB=arvexo_ai
POSTGRES_USER=arvexo
POSTGRES_PASSWORD=change_me_password
```

В docker-compose использовать:

```txt
env_file: .env
```

Важно:

```txt
Do not commit real .env.
Do not expose Telegram token.
Do not expose Postgres port publicly in production.
```

---

## 30. README

Создать README.md с инструкциями:

```txt
1. Установка локально
2. Запуск frontend
3. Запуск backend
4. Запуск PostgreSQL локально
5. Запуск через Docker Compose
6. Настройка .env
7. Как подключить Telegram-бота
8. Как применить Alembic migrations
9. Как задеплоить на VPS
10. Как подключить домен ai.arvexo.ru
11. Как добавить SSL
12. Как проверить, что форма работает
```

Команды:

```bash
docker compose up --build -d
docker compose logs -f
docker compose down
```

Локальный запуск frontend:

```bash
cd frontend
npm install
npm run dev
```

Локальный запуск backend:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Для Windows добавить:

```bash
.venv\Scripts\activate
```

Проверка health:

```bash
curl http://localhost:8000/health
```

Проверка lead endpoint:

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

---

## 31. SEO

В Next.js добавить metadata:

```txt
title: Arvexo AI Consulting — AI-консалтинг и автоматизация бизнеса
description: Внедряем AI-решения для продаж, поддержки, аналитики и автоматизации бизнес-процессов: AI-аудит, боты, ассистенты и интеграции.
```

Добавить Open Graph:

```txt
og:title: Arvexo AI Consulting
og:description: AI-консалтинг и автоматизация бизнес-процессов
og:type: website
og:url: https://ai.arvexo.ru
```

Добавить favicon placeholder или TODO.

---

## 32. Accessibility

Требования:

```txt
semantic HTML
button вместо div для кликабельных элементов
labels для form fields
aria-expanded для FAQ accordion
alt для изображений, если будут изображения
visible focus states
достаточный контраст текста
keyboard navigation for mobile menu and FAQ
```

---

## 33. Mobile responsiveness

Обязательно проверить:

```txt
360px
390px
768px
1024px
1440px
```

На мобильной версии:

```txt
одна колонка
hero mockup ниже текста
burger menu
кнопки удобные для нажатия
форма без горизонтального скролла
карточки не должны сжиматься до нечитаемого состояния
```

---

## 34. Code quality

Frontend:

```txt
npm run lint should pass
npm run build should pass
TypeScript should have no errors
no unused large dependencies
```

Backend:

```txt
use type hints
use Pydantic schemas
use async SQLAlchemy sessions
handle errors cleanly
keep Telegram sending isolated in service layer
keep DB logic clear and readable
```

Security basics:

```txt
HTML-escape Telegram message user input
validate max lengths
do not log secrets
use env variables
keep .env out of git
```

---

## 35. Acceptance criteria

Проект считается готовым, если:

```txt
docker compose up --build -d successfully starts frontend, backend, postgres and nginx

PostgreSQL container has persistent volume

Alembic migration creates leads table

https://ai.arvexo.ru can serve the frontend after DNS and SSL setup

POST /api/leads accepts valid lead data

Valid lead is saved to PostgreSQL

Successful lead sends Telegram notification via aiogram

If Telegram fails, lead remains saved with telegram_status = failed

Invalid lead data returns validation error

Honeypot lead returns success but is not saved and not sent to Telegram

Frontend form sends data to backend

Frontend shows success and error states

Frontend requires privacy consent checkbox

Site is responsive on mobile and desktop

No Wix/skills.sh mentions are visible on the website

Design closely follows the provided consulting/coaching references in visual vibe, composition, spacing and premium B2B style

Code is clean, typed and structured
```

Required verification commands:

```bash
cd frontend && npm run build
cd frontend && npm run lint

docker compose up --build -d
docker compose ps
docker compose logs -f backend
curl http://localhost:8000/health
```

---

## 36. Important final instruction for Codex

Сначала создай полностью рабочую структуру проекта.

Затем реализуй frontend landing page.

Затем реализуй FastAPI backend.

Затем добавь PostgreSQL, SQLAlchemy async и Alembic migration.

Затем реализуй сохранение заявок в PostgreSQL.

Затем добавь Telegram notification через aiogram.

Затем добавь Docker, docker-compose, nginx и README.

Не сокращай лендинг до трёх блоков. Реализуй все секции из ТЗ.

Особенно важно:

```txt
1. Визуально ориентируйся на указанные Wix consulting/coaching шаблоны.
2. Не упоминай Wix и skills.sh на сайте.
3. Не используй generic AI robot visuals.
4. Сделай сайт чистым, премиальным и B2B-oriented.
5. PostgreSQL обязателен, заявки должны сохраняться в базе.
6. Не допускай ошибки /api/api/leads в frontend API URL.
```
