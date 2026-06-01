import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { TournamentTeam } from './tournament-team.entity';
import { TournamentRepository } from './tournament.repository';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentTeam])],
  controllers: [TournamentController],
  providers: [TournamentRepository, TournamentService],
})
export class TournamentsModule {}
