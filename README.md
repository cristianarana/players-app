# Players App

Aplicación de gestión de jugadores, personal técnico y equipos.

## Stack

- **Backend:** NestJS + TypeORM + PostgreSQL
- **Frontend:** React + TypeScript + Vite
- **Shared:** `PersonBase`, `CrudRepository<T>`, `BaseRepository<T>` (TypeORM entity + repositorios genéricos)
- **Infraestructura:** Docker Compose (backend, frontend, db)

## Estructura

```
backend/src/
  players/            CRUD de jugadores (extiende PersonBase)
  technical_staff/    CRUD de personal técnico (extiende PersonBase)
  team/               CRUD de equipos (relacionado 1:N con players y technical_staff)
  config/             configuración de BD
  health/             health check
  common/filters/     ExceptionFilter global

shared/
  entities/           PersonBase (abstracto, con @DeleteDateColumn)
  repository/         CrudRepository y BaseRepository genéricos con transacciones

frontend/
  src/                app React + Vite
```

## Ejecución

```bash
docker compose up -d
```

Backend en `http://localhost:3000`, frontend en `http://localhost:5173`.

## APIs

| Recurso | Endpoints |
|---------|-----------|
| Players | `POST/GET/GET:id/GET/search?fullName=/PUT/DELETE /players` |
| Technical Staff | `POST/GET/GET:id/GET/search?fullName=/PUT/DELETE /technical-staff` |
| Teams | `POST/GET/GET:id/PUT/DELETE /teams` |
