# Changelog

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
