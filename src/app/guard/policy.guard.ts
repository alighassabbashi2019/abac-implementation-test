import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from '@user/model/user/user.entity';
import { ObjectLiteral } from 'typeorm';
import { ResourceResolverService } from '../module/resource-resolver/resource-resolver.service';
import { ActionEnum, Resource, RoleEnum } from '@constant/enum';
import { ABAC_RESOURCE_KEY } from '@decorator/abac-resource.decorator';
import { ABAC_ACTION_KEY } from '@decorator/abac-action.decorator';
import { PolicyRepository } from '@authentication/model/policy/policy.repository';
import { PolicyEntity } from '@authentication/model/policy/policy.entity';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly resourceResolverService: ResourceResolverService,
    private readonly policyRepository: PolicyRepository,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const abacResource = this.reflector.get<Resource>(ABAC_RESOURCE_KEY, context.getClass());
    const abacAction = this.reflector.get<ActionEnum>(ABAC_ACTION_KEY, context.getHandler());
    if (!abacAction || !abacResource) return true;

    const { id: resourceId } = context.switchToHttp().getRequest().params;
    const { currentUser } = context.switchToHttp().getRequest();
    let resourceEntity: ObjectLiteral;
    if (resourceId) {
      resourceEntity = await this.resourceResolverService.resolveResource(resourceId);
    }

    const policies = await this.policyRepository.findByResourceAndAction(abacResource, abacAction);
    if (!policies?.length) return true;
    return policies.every(policy => this.checkPolicy(policy, currentUser, resourceEntity));
  }

  private checkPolicy(policy: PolicyEntity, user: UserEntity, resourceEntity: ObjectLiteral): boolean {
    const allowedRoles: RoleEnum[] = policy.conditions.roles as unknown as RoleEnum[];
    if (allowedRoles?.length) {
      if (!allowedRoles.includes(user.role.name)) {
        return false;
      }
      return allowedRoles.every(role => {
        if (user.role.name === role && policy.conditions[role]) {
          const resourceFields = policy.conditions[role]['resource'];
          const conditionCheck = this.checkConditions(resourceFields, user, resourceEntity);
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
    resourceEntity: ObjectLiteral,
  ): boolean {
    return Object.entries(resourceFields).every(([key, value]) => {
      const expectedValue = value as string;
      const isDynamicValue = expectedValue.includes(':');
      const userField = expectedValue.replace(':', '') as keyof UserEntity;
      const valueOnUser = isDynamicValue ? user[userField] : null;
      return resourceEntity[key] === (isDynamicValue ? valueOnUser : value);
    });
  }
}
