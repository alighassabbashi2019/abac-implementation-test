import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PolicyEntity } from '@authentication/model/policy/policy.entity';
import { ActionEnum, Resource } from '@constant/enum';

@Injectable()
export class PolicyRepository extends Repository<PolicyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PolicyEntity, dataSource.createEntityManager());
  }

  findByResourceAndAction(resource: Resource, actionName: ActionEnum) {
    return this.find({
      where: {
        resource: resource,
        action: {
          name: actionName,
        },
      },
      relations: ['action'],
    });
  }
}
