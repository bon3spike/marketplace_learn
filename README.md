# Marketplace Learn — Monorepo

Учебный монорепозиторий маркетплейса:
- `hs-mp-front` — React‑приложение (CRA + TypeScript).
- `hs-mp-srv` — NestJS API с TypeORM и PostgreSQL (Docker compose в папке сервиса).
- `hs-mp-admin`, `hs-mp-seller` — заготовки под будущие части.

Загрузки картинок складываются в `hs-mp-srv/storage/images/products` (в git только `.gitkeep`).

## Быстрый старт

### 1) Клонировать и поставить зависимости
```bash
git clone https://github.com/bon3spike/marketplace_learn.git
cd marketplace

cd hs-mp-srv && npm install
cd ../hs-mp-front && npm install
2) Настроить API (hs-mp-srv/.env по умолчанию)

PORT=3002
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5433
POSTGRES_USER=nest_test
POSTGRES_PASSWORD=nest_test
POSTGRES_DATABASE=nest_test
POSTGRES_DB=nest_test
POSTGRES_HOST_PORT=5433
PgAdmin: http://localhost:5050 (логин mw_marketplace@admin.com, пароль mw_marketplace).

3) Поднять базу
bash

cd hs-mp-srv
docker compose up -d   # Postgres на 5433, pgAdmin на 5050
4) Запустить API
bash

cd hs-mp-srv
npm run start:dev      # http://localhost:3002
Маршруты: /products, /users (CRUD, multipart для загрузки картинок в products).

5) Запустить фронт
bash

cd hs-mp-front
npm start              # http://localhost:3000
Полезно знать
PgAdmin из контейнера подключается к Postgres по host.docker.internal (line 5433) или nest_postgres (line 5432).
Файлы загрузок в git не входят, кроме .gitkeep.
Меняете порты/креды БД — синхронизируйте .env и docker-compose.yml в hs-mp-srv.


После замены:
git add README.md
git commit -m "docs: update repo overview and setup"
git push origin main



Если нужен автопатч — скажи, я повторю, когда доступ к FS восстановится.