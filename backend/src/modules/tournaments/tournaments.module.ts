import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { TournamentTeam } from './entities/tournament-team.entity';
import { TournamentRepository } from './repositories/tournament.repository';
import { TournamentService } from './services/tournament.service';
import { TournamentController } from './controllers/tournament.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentTeam])],
  controllers: [TournamentController],
  providers: [TournamentRepository, TournamentService],
})
export class TournamentsModule {}
