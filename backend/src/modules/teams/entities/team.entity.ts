import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Player } from '../../players/entities/player.entity';
import { TechnicalStaff } from '../../technical_staff/entities/technical_staff.entity';
import { TournamentTeam } from '../../tournaments/entities/tournament-team.entity';
import { Match } from '../../matches/entities/match.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @OneToMany(() => Player, player => player.team)
  players: Player[];

  @OneToMany(() => TechnicalStaff, technicalStaff => technicalStaff.team)
  technicalStaff: TechnicalStaff[];

  @OneToMany(() => TournamentTeam, tournamentTeam => tournamentTeam.team)
  tournamentTeams: TournamentTeam[];

  @OneToMany(() => Match, match => match.homeTeam)
  homeMatches: Match[];

  @OneToMany(() => Match, match => match.awayTeam)
  awayMatches: Match[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
