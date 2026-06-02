# Players App

Aplicación de gestión deportiva para administrar jugadores, cuerpo técnico, equipos, torneos, entrenamientos y partidos. Consta de una **API REST** (NestJS + PostgreSQL) y una **interfaz web** (React + Vite), con una librería compartida de tipos y utilidades entre ambas.

## Stack

- **Backend:** NestJS, TypeORM, PostgreSQL, class-validator
- **Frontend:** React 18, TypeScript, Vite
- **Infraestructura:** Docker Compose (multi-stage, hot-reload en desarrollo)

## Quick Start

```bash
docker compose up -d
```

Backend en `http://localhost:3000`, frontend en `http://localhost:5173`.

Para desarrollo con hot-reload:

```bash
docker compose -f docker-compose.dev.yml up -d
```

## Estructura general

```
backend/     API REST con 7 módulos (players, team, technical_staff,
             tournaments, trainings, matches, health)
frontend/    UI web con proxy hacia la API
shared/      Entidades base, tipos de respuesta y repositorios genéricos
```

## Estado del proyecto

El backend cuenta con **7 módulos**, **44 endpoints REST** y **9 entidades** con relaciones entre sí (torneos → etapas → jornadas → partidos). El frontend está en etapa inicial con el esqueleto de la aplicación montado.

Para información técnica detallada (entidades, endpoints, patrones, convenciones), ver [`stack.md`](./stack.md).
