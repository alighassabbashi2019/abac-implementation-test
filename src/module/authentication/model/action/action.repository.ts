import { DataSource, Repository } from 'typeorm';
import { ActionEntity } from '@authentication/model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ActionRepository extends Repository<ActionEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ActionEntity, dataSource.createEntityManager());
  }
}
