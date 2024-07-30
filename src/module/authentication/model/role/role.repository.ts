import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from '@authentication/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
