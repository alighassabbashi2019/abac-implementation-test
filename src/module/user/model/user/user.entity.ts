import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { RoleEntity } from '@authentication/model';
import { ProductEntity } from '@product/model/product.entity';

@Entity('users')
@Unique(['username'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  roleId: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'roleId' })
  role: RoleEntity;

  @OneToMany(() => ProductEntity, product => product.owner)
  products: ProductEntity[];
}
