import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resource } from '@constant/enum';
import { ActionEntity } from '@authentication/model';

@Entity('policies')
export class PolicyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Resource })
  resource: Resource;

  @Column()
  actionId: string;

  @Column({ type: 'jsonb' })
  conditions: Record<string, string | Record<string, string>>;

  @ManyToOne(() => ActionEntity, action => action.policies)
  @JoinColumn({ name: 'actionId' })
  action: ActionEntity;
}
