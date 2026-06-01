import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TrainingPlayer } from './training-player.entity';

@Entity('trainings')
export class Training {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  day: string;

  @Column()
  microcycle: string;

  @Column({ name: 'principal_objective' })
  principal_objective: string;

  @Column({ name: 'info_file', nullable: true })
  info_file?: string;

  @OneToMany(() => TrainingPlayer, trainingPlayer => trainingPlayer.training)
  trainingPlayers: TrainingPlayer[];
}
