import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn } from 'typeorm';
import { RoleType } from '../dto/role-type.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 10 })
  role: RoleType;

  @DeleteDateColumn({ name: 'inactive_at' })
  inactive_at?: Date;
}
