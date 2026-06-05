import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, DeleteDateColumn } from 'typeorm';
import { Training } from './training.entity';
import { Player } from '../../players/entities/player.entity';

@Entity('training_players')
export class TrainingPlayer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Training, training => training.trainingPlayers)
  @JoinColumn({ name: 'training_id' })
  training: Training;

  @Column({ name: 'training_id' })
  training_id: string;

  @ManyToOne(() => Player, player => player.trainingPlayers)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @Column({ name: 'player_id' })
  player_id: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
