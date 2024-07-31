import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PolicyEntity } from '@authentication/model/policy/policy.entity';
import { ActionEnum, SubjectEnum } from '@constant/enum';

@Injectable()
export class PolicyRepository extends Repository<PolicyEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(PolicyEntity, dataSource.createEntityManager());
  }

  findBySubjectAndAction(subject: SubjectEnum, actionName: ActionEnum) {
    return this.find({
      where: {
        subject,
        action: {
          name: actionName,
        },
      },
      relations: ['action'],
    });
  }
}
