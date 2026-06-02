import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionStage } from './entities/competition-stage.entity';
import { MatchDay } from './entities/match-day.entity';
import { Match } from './entities/match.entity';
import { CompetitionStageRepository } from './repositories/competition-stage.repository';
import { MatchDayRepository } from './repositories/match-day.repository';
import { MatchRepository } from './repositories/match.repository';
import { CompetitionStageService } from './services/competition-stage.service';
import { MatchDayService } from './services/match-day.service';
import { MatchService } from './services/match.service';
import { CompetitionStageController } from './controllers/competition-stage.controller';
import { MatchDayController } from './controllers/match-day.controller';
import { MatchController } from './controllers/match.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionStage, MatchDay, Match])],
  controllers: [CompetitionStageController, MatchDayController, MatchController],
  providers: [
    CompetitionStageRepository, CompetitionStageService,
    MatchDayRepository, MatchDayService,
    MatchRepository, MatchService,
  ],
})
export class MatchesModule {}
