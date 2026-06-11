import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { PersonBase } from '@shared/entities/person-base.entity';
import { Team } from '../../teams/entities/team.entity';

@Entity('technical_staff')
export class TechnicalStaff extends PersonBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'principal_role' })
  principal_role: string;

  @Column({ name: 'secondary_role', default: 'None' })
  secondary_role: string;

  @Column({ name: 'contract_date', nullable: true, type: 'date' })
  contract_date?: string;

  @Column({ name: 'contract_due_date', nullable: true, type: 'date' })
  contract_due_date?: string;

  @ManyToOne(() => Team, team => team.technicalStaff)
  @JoinColumn({ name: 'team_id' })
  team?: Team;

  @Column({ name: 'team_id', nullable: true })
  team_id?: string;

  @Column({ name: 'user_id', nullable: true })
  user_id?: string;
}
