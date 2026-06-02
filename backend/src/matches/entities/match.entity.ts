import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Team } from '../../team/entities/team.entity';
import { MatchDay } from './match-day.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'home_score' })
  home_score: number;

  @Column({ name: 'away_score' })
  away_score: number;

  @Column()
  stadium: string;

  @Column({ name: 'scheduled_at', type: 'date' })
  scheduled_at: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'home_team_id' })
  homeTeam: Team;

  @Column({ name: 'home_team_id' })
  home_team_id: string;

  @ManyToOne(() => Team)
  @JoinColumn({ name: 'away_team_id' })
  awayTeam: Team;

  @Column({ name: 'away_team_id' })
  away_team_id: string;

  @ManyToOne(() => MatchDay, matchDay => matchDay.matches)
  @JoinColumn({ name: 'matchday_id' })
  matchDay: MatchDay;

  @Column({ name: 'matchday_id' })
  matchday_id: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
