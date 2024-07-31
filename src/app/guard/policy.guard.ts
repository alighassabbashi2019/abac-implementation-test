import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '@user/model/user/user.entity';
import { ObjectLiteral } from 'typeorm';
import { SubjectResolverService } from '../module/subject-resolver/subject-resolver.service';
import { ActionEnum, RoleEnum, SubjectEnum } from '@constant/enum';
import { ABAC_SUBJECT_KEY } from '@decorator/abac-subject.decorator';
import { ABAC_ACTION_KEY } from '@decorator/abac-action.decorator';
import { PolicyRepository } from '@authentication/model/policy/policy.repository';
import { PolicyEntity } from '@authentication/model/policy/policy.entity';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly subjectResolverService: SubjectResolverService,
    private readonly policyRepository: PolicyRepository,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const abacSubject = this.reflector.get<SubjectEnum>(ABAC_SUBJECT_KEY, context.getClass());
    const abacAction = this.reflector.get<ActionEnum>(ABAC_ACTION_KEY, context.getHandler());
    if (!abacAction || !abacSubject) return true;

    const { id: subjectId } = context.switchToHttp().getRequest().params;
    const { currentUser } = context.switchToHttp().getRequest();
    let subjectEntity: ObjectLiteral;
    if (subjectId) {
      subjectEntity = await this.subjectResolverService.resolveSubject(subjectId);
    }

    const policies = await this.policyRepository.findBySubjectAndAction(abacSubject, abacAction);
    if (!policies?.length) return true;
    return policies.every(policy => this.checkPolicy(policy, currentUser, subjectEntity));
  }

  private checkPolicy(policy: PolicyEntity, user: UserEntity, subjectEntity: ObjectLiteral): boolean {
    const allowedRoles: RoleEnum[] = policy.conditions.roles as unknown as RoleEnum[];
    if (allowedRoles?.length) {
      if (!allowedRoles.includes(user.role.name)) {
        return false;
      }
      return allowedRoles.every(role => {
        if (user.role.name === role && policy.conditions[role]) {
          const resourceFields = policy.conditions[role]['resource'];
          const conditionCheck = this.checkConditions(resourceFields, user, subjectEntity);
          if (!conditionCheck) {
            return false;
          }
        }
        return true;
      });
    }
  }

  private checkConditions(
    resourceFields: Record<string, string>,
    user: UserEntity,
    subjectEntity: ObjectLiteral,
  ): boolean {
    return Object.entries(resourceFields).every(([key, value]) => {
      const expectedValue = value as string;
      const isDynamicValue = expectedValue.includes(':');
      const userField = expectedValue.replace(':', '') as keyof UserEntity;
      const valueOnUser = isDynamicValue ? user[userField] : null;
      return subjectEntity[key] === (isDynamicValue ? valueOnUser : value);
    });
  }
}
