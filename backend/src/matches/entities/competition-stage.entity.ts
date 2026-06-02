import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { CompetitionStageType } from './competition-stage-type.enum';
import { Tournament } from '../../tournaments/tournament.entity';

@Entity('competition_stages')
export class CompetitionStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ name: 'stage_type', type: 'int' })
  stage_type: CompetitionStageType;

  @ManyToOne(() => Tournament, tournament => tournament.competitionStages)
  @JoinColumn({ name: 'tournament_id' })
  tournament: Tournament;

  @Column({ name: 'tournament_id' })
  tournament_id: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
