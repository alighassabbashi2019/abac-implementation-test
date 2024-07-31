import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ActionEnum } from '@constant/enum';
import { PolicyEntity } from '@authentication/model/policy/policy.entity';

@Entity('actions')
export class ActionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ActionEnum })
  name: ActionEnum;

  @OneToMany(() => PolicyEntity, policy => policy.action)
  policies: PolicyEntity[];
}
