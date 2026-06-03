import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { HealthModule } from './modules/health/health.module';
import { PlayersModule } from './modules/players/players.module';
import { TechnicalStaffModule } from './modules/technical_staff/technical_staff.module';
import { TeamModule } from './modules/teams/team.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TrainingModule } from './modules/trainings/training.module';
import { MatchesModule } from './modules/matches/matches.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(databaseConfig), HealthModule, PlayersModule, TechnicalStaffModule, TeamModule, TournamentsModule, TrainingModule, MatchesModule],
})
export class AppModule {}
