import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, DeleteDateColumn } from 'typeorm';
import { CompetitionStage } from './competition-stage.entity';
import { Match } from './match.entity';

@Entity('match_days')
export class MatchDay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'start_date', nullable: true, type: 'date' })
  start_date?: string;

  @Column({ name: 'end_date', nullable: true, type: 'date' })
  end_date?: string;

  @ManyToOne(() => CompetitionStage, competitionStage => competitionStage.matchDays)
  @JoinColumn({ name: 'competition_stage_id' })
  competitionStage: CompetitionStage;

  @Column({ name: 'competition_stage_id' })
  competition_stage_id: string;

  @OneToMany(() => Match, match => match.matchDay)
  matches: Match[];

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
