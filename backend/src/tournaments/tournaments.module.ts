import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { TournamentTeam } from './tournament-team.entity';
import { TournamentRepository } from './tournament.repository';
import { TournamentTeamRepository } from './tournament-team.repository';
import { TournamentService } from './tournament.service';
import { TournamentTeamService } from './tournament-team.service';
import { TournamentController } from './tournament.controller';
import { TournamentTeamController } from './tournament-team.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, TournamentTeam])],
  controllers: [TournamentController, TournamentTeamController],
  providers: [TournamentRepository, TournamentTeamRepository, TournamentService, TournamentTeamService],
})
export class TournamentsModule {}
