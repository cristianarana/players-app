import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Player } from '../players/player.entity';
import { TechnicalStaff } from '../technical_staff/technical_staff.entity';

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
}
