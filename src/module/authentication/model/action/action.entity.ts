import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ActionEnum } from '@constant/enum';

@Entity('actions')
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ActionEnum })
  name: ActionEnum;
}
