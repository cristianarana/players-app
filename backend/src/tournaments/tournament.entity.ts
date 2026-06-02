import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { TournamentType } from './tournament-type.enum';
import { TournamentTeam } from './tournament-team.entity';
import { CompetitionStage } from '../matches/entities/competition-stage.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'tournament_type', type: 'int' })
  tournament_type: TournamentType;

  @Column({ name: 'initial_date', type: 'date' })
  initial_date: string;

  @Column({ name: 'due_date', type: 'date' })
  due_date: string;

  @OneToMany(() => TournamentTeam, tournamentTeam => tournamentTeam.tournament)
  tournamentTeams: TournamentTeam[];

  @OneToMany(() => CompetitionStage, competitionStage => competitionStage.tournament)
  competitionStages: CompetitionStage[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
