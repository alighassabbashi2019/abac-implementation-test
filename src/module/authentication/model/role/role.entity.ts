import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEnum } from '@constant/enum';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'enum', enum: RoleEnum })
  name: RoleEnum;
}
