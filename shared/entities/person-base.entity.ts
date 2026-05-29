import { Column, DeleteDateColumn } from 'typeorm';

export abstract class PersonBase {
  @Column({ name: 'first_name' })
  first_name!: string;

  @Column({ name: 'last_name' })
  last_name!: string;

  @Column()
  birthdate!: string;

  @Column()
  nationality!: string;

  @Column({ name: 'weight', nullable: true, type: 'decimal' })
  weight?: number;

  @Column({ name: 'height', nullable: true, type: 'decimal' })
  height?: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at?: Date;
}
