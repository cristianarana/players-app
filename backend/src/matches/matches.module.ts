import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionStage } from './entities/competition-stage.entity';
import { MatchesRepository } from './repositories/matches.repository';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CompetitionStage])],
  controllers: [MatchesController],
  providers: [MatchesRepository, MatchesService],
})
export class MatchesModule {}
