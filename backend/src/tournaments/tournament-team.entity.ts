import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Team } from '../team/team.entity';

@Entity('tournament_teams')
export class TournamentTeam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament, tournament => tournament.tournamentTeams)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({ name: 'tournament_id' })
  tournament_id: string;

  @ManyToOne(() => Team, team => team.tournamentTeams)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @Column({ name: 'team_id' })
  team_id: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
