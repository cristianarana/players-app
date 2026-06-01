import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { HealthModule } from './health/health.module';
import { PlayersModule } from './players/players.module';
import { TechnicalStaffModule } from './technical_staff/technical_staff.module';
import { TeamModule } from './team/team.module';
import { TournamentsModule } from './tournaments/tournaments.module';
import { TrainingModule } from './trainings/training.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(databaseConfig), HealthModule, PlayersModule, TechnicalStaffModule, TeamModule, TournamentsModule, TrainingModule],
})
export class AppModule {}
