# Changelog

## 0.2.1 (2026-06-05)

### Changed
- Migración de Hard Delete a Soft Delete en los módulos:
  - **Teams**: agregado `@DeleteDateColumn` en entidad, override de repositorio con `softDelete()`
  - **Trainings**: agregado `@DeleteDateColumn` en `Training` y `TrainingPlayer`, override de repositorio, junction usa `softDelete`
  - **Matches**: override de repositorio con `softDelete()` (ya tenía columna)
  - **Match Days**: override de repositorio con `softDelete()` (ya tenía columna)
  - **Competition Stages**: override de repositorio con `softDelete()` (ya tenía columna)
  - **TournamentTeam** (junction): cambio a `softDelete` en `tournament.service.update`

### Fixed
- Descripciones de Swagger corregidas de "hard delete" a "soft delete" en Players, Technical Staff, Teams, Trainings, Matches, Match Days y Competition Stages

## 0.2.0 (2026-06-03)

### Added
- Swagger/OpenAPI documentation for all modules:
  - **Teams**: controller + DTOs manually decorated
  - **Players**: controller + DTOs manually decorated
  - **Technical Staff**: controller + DTOs manually decorated
  - **Tournaments**: controller + DTOs manually decorated (includes `TournamentType` enum)
  - **Trainings**: controller + DTOs manually decorated (includes `@ApiConsumes` for file upload)
  - **Matches**: 3 sub-modules (Competition Stages, Match Days, Matches) manually decorated
- Swagger plugin config in `nest-cli.json`
- Root redirect from `/` to `/api/docs` in `main.ts`

## 0.1.0 (2026-05-27)

### Added
- Initial NestJS project structure with modules:
  - `health`, `teams`, `players`, `technical_staff`, `tournaments`, `trainings`, `matches`
- Modular architecture: controllers, DTOs, entities, services, repositories
- Shared base entities (`PersonBase`) and repositories (`CrudRepository`)
- Docker multistage setup with `ts-node-dev` for development
