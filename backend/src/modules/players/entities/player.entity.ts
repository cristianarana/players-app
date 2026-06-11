import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { PersonBase } from '@shared/entities/person-base.entity';
import { Team } from '../../teams/entities/team.entity';
import { TrainingPlayer } from '../../trainings/entity/training-player.entity';

@Entity('players')
export class Player extends PersonBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  position: string;

  @Column({ name: 'secondary_position', default: 'None' })
  secondary_position: string;

  @Column({ name: 'strong_foot' })
  strong_foot: string;

  @Column({ default: 'None' })
  injury: string;

  @Column({ name: 'injury_date', nullable: true, type: 'date' })
  injury_date?: string;

  @Column({ name: 'injury_due_date', nullable: true, type: 'date' })
  injury_due_date?: string;

  @Column({ name: 'market_value', type: 'decimal', default: 0 })
  market_value: number;

  @Column({ name: 'contract_date', nullable: true, type: 'date' })
  contract_date?: string;

  @Column({ name: 'contract_due_date', nullable: true, type: 'date' })
  contract_due_date?: string;

  @Column({ name: 'contact_phone', nullable: true})
  contact_phone?: number;

  @Column({ name:'contact_email', nullable:true})
  contact_email?:string;

  @Column({ name: 'user_id', nullable: true })
  user_id?: string;

  @ManyToOne(() => Team, team => team.players)
  @JoinColumn({ name: 'team_id' })
  team?: Team;

  @Column({ name: 'team_id', nullable: true })
  team_id?: string;

  @OneToMany(() => TrainingPlayer, trainingPlayer => trainingPlayer.player)
  trainingPlayers: TrainingPlayer[];
}
