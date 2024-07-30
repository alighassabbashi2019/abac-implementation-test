import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductType } from '@product/constant';
import { UserEntity } from '@user/model/user/user.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ProductType })
  type: ProductType;

  @Column()
  ownerId: string;

  @ManyToOne(() => UserEntity, user => user.products)
  @JoinColumn({ name: 'ownerId' })
  owner: UserEntity;
}
