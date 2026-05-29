# Stack Tecnológico — Players App

## Arquitectura
- **Tipo:** Monolítica

## Backend
- **Runtime:** Node.js
- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **ORM:** TypeORM

## Base de Datos
- **Motor:** PostgreSQL

## Frontend
- **Framework:** React
- **Lenguaje:** TypeScript
- **Build tool:** Vite

## Testing
- _Por definir_

## Validación
- **Backend:** class-validator + class-transformer (ValidationPipe global con whitelist)

## CI/CD
- **Plataforma:** GitHub Actions
  - `backend-ci.yml` — install, lint, build, test
  - `frontend-ci.yml` — install, lint, build

## Linting
- ESLint + @typescript-eslint (ambos proyectos)
- eslint-plugin-react-hooks (frontend)

## Gestión de dependencias
- npm

## Infraestructura
- **Contenedores:** Docker + Docker Compose
  - `backend` — contenedor con la app NestJS
  - `frontend` — contenedor con la app React (Vite)
  - `db` — contenedor con PostgreSQL
