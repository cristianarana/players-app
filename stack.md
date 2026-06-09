# Stack Técnico

## Backend

**Framework:** NestJS 10 con TypeScript 5.5
**ORM:** TypeORM 0.3 con PostgreSQL 16
**Validación:** class-validator + class-transformer + ValidationPipe global (`whitelist: true`, `forbidNonWhitelisted: true`)
**Manejo de errores:** ExceptionFilter global que unifica formato de respuesta HTTP
**Alias:** `@shared/*` → `../shared/` (configurado en tsconfig.json)

### Módulos y entidades

| Módulo | Entidades | FK |
|--------|-----------|----|
| `players` | Player (extiende PersonBase) | → Team (opcional) |
| `technical_staff` | TechnicalStaff (extiende PersonBase) | → Team (opcional) |
| `team` | Team | — |
| `tournaments` | Tournament, TournamentTeam | → Team (vía tabla pivote) |
| `trainings` | Training, TrainingPlayer | → Player (vía tabla pivote) |
| `matches` | CompetitionStage, MatchDay, Match | → Tournament, CompetitionStage, Team |
| `health` | — | — |

Cada módulo sigue la estructura:

```
modulo/
├── controllers/     controladores con decoradores @Controller(), @Get(), etc.
├── services/        lógica de negocio, validación de FK, manejo de errores
├── repositories/    repositorios TypeORM, extienden CrudRepository o BaseRepository
├── entities/        entidades TypeORM @Entity()
└── dto/             DTOs con decoradores class-validator
```

### API — Endpoints

| Método | Ruta | Cuerpo / Query | Upload |
|--------|------|----------------|--------|
| `GET` | `/health` | — | — |
| `POST` | `/players` | `CreatePlayerDto` | — |
| `GET` | `/players` | — | — |
| `GET` | `/players/search` | `?fullName=` | — |
| `GET` | `/players/:id` | — | — |
| `PUT` | `/players/:id` | `UpdatePlayerDto` | — |
| `DELETE` | `/players/:id` | — | — |
| `POST` | `/teams` | `CreateTeamDto` | — |
| `GET` | `/teams` | — | — |
| `GET` | `/teams/:id` | — | — |
| `PUT` | `/teams/:id` | `UpdateTeamDto` | — |
| `DELETE` | `/teams/:id` | — | — |
| `POST` | `/technical-staff` | `CreateTechnicalStaffDto` | — |
| `GET` | `/technical-staff` | — | — |
| `GET` | `/technical-staff/search` | `?fullName=` | — |
| `GET` | `/technical-staff/:id` | — | — |
| `PUT` | `/technical-staff/:id` | `UpdateTechnicalStaffDto` | — |
| `DELETE` | `/technical-staff/:id` | — | — |
| `POST` | `/tournaments` | `CreateTournamentDto` | — |
| `GET` | `/tournaments` | — | — |
| `GET` | `/tournaments/:id` | — | — |
| `PUT` | `/tournaments/:id` | `UpdateTournamentDto` | — |
| `DELETE` | `/tournaments/:id` | — | — |
| `POST` | `/trainings` | `CreateTrainingDto` + file | `info_file` |
| `GET` | `/trainings` | — | — |
| `GET` | `/trainings/:id` | — | — |
| `PUT` | `/trainings/:id` | `UpdateTrainingDto` + file | `info_file` |
| `DELETE` | `/trainings/:id` | — | — |
| `POST` | `/competition-stages` | `CreateCompetitionStageDto` | — |
| `GET` | `/competition-stages` | — | — |
| `GET` | `/competition-stages/:id` | — | — |
| `PUT` | `/competition-stages/:id` | `UpdateCompetitionStageDto` | — |
| `DELETE` | `/competition-stages/:id` | — | — |
| `POST` | `/match-days` | `CreateMatchDayDto` | — |
| `GET` | `/match-days` | — | — |
| `GET` | `/match-days/:id` | — | — |
| `PUT` | `/match-days/:id` | `UpdateMatchDayDto` | — |
| `DELETE` | `/match-days/:id` | — | — |
| `POST` | `/matches` | `CreateMatchDto` | — |
| `GET` | `/matches` | — | — |
| `GET` | `/matches/:id` | — | — |
| `PUT` | `/matches/:id` | `UpdateMatchDto` | — |
| `DELETE` | `/matches/:id` | — | — |

### Patrón de manejo de errores

Los repositorios envuelven operaciones de base de datos en transacciones (`QueryRunner`) y retornan `ServiceResponse<T>`:

```typescript
type ServiceResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
};
```

Los servicios interpretan `ServiceResponse` y lanzan excepciones HTTP de NestJS según el caso:

| ServiceResponse | Excepción HTTP |
|----------------|----------------|
| `success: false` + `error: 'NOT_FOUND'` | `NotFoundException` (404) |
| `success: false` + cualquier otro error | `BadRequestException` (400) |
| Error no capturado en `findAll()` / `findById()` | `InternalServerErrorException` (500) |

### Shared Library (`shared/`)

| Archivo | Propósito |
|---------|-----------|
| `entities/person-base.entity.ts` | Clase abstracta con `first_name`, `last_name`, `birthdate`, `nationality`, `weight`, `height`, `deleted_at` (soft-delete) |
| `repository/service-response.type.ts` | Tipo `ServiceResponse<T>` |
| `repository/crud-repository.ts` | Repositorio genérico con `createEntity()`, `updateEntity()`, `deleteById()` (transaccional, envuelve errores) |
| `repository/base-repository.ts` | Extiende `CrudRepository<T extends PersonBase>` con `deleteById()` (soft-delete) y `getByFullName()` |

## Frontend

**Framework:** React 18 con TypeScript
**Build tool:** Vite 5 con plugin `@vitejs/plugin-react`
**Proxy:** `/api` → `http://backend:3000` (desarrollo) / Nginx reverse proxy (producción)
**Alias:** `@shared/*` → `../shared/`

Actualmente cuenta con el esqueleto de la aplicación (`App.tsx`, `main.tsx`).

## Infraestructura

### Docker

- **`docker-compose.yml`** — Entorno de producción: db (PostgreSQL 16), backend (Node 20 multi-stage), frontend (Nginx sirviendo build estático)
- **`docker-compose.dev.yml`** — Entorno de desarrollo con volúmenes montados para hot-reload (backend con `ts-node-dev`, frontend con Vite dev server)
- **Multi-stage:** development → build → production (backend y frontend)

### Variables de entorno

| Variable | Default | Descripción |
|----------|---------|-------------|
| `DB_HOST` | `localhost` | Host de PostgreSQL |
| `DB_PORT` | `5432` | Puerto de PostgreSQL |
| `DB_USERNAME` | `postgres` | Usuario de BD |
| `DB_PASSWORD` | `postgres` | Contraseña de BD |
| `DB_DATABASE` | `players_app` | Nombre de la BD |
| `PORT` | `3000` | Puerto del backend |
| `JWT_SECRET` | `super-secret-key` | Clave secreta para firmar JWT |
| `JWT_EXPIRES_IN` | `24h` | Tiempo de expiración del token (ej: `1h`, `7d`) |

## Convenciones del proyecto

- Subdirectorios en plural: `controllers/`, `services/`, `repositories/`, `entities/`
- DTOs en carpeta `dto/` al nivel del módulo (no dentro de subdirectorios)
- Archivos nombrados según el módulo: `player.controller.ts`, `player.service.ts`, etc.
- Mensajes de error en inglés en todos los servicios y controladores
- `ParseUUIDPipe` aplicado a todos los parámetros `:id`
- `synchronize: true` en TypeORM (solo desarrollo; en producción se requiere migraciones)
