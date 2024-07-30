import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CHECK_POLICIES_KEY } from '@decorator/check-policy.decorator';
import { UserEntity } from '@user/model/user/user.entity';
import { PolicyHandlerCallback } from '@type/policy-handler.type';
import { ObjectLiteral } from 'typeorm';
import { SubjectResolverService } from '../module/subject-resolver/subject-resolver.service';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly subjectResolverService: SubjectResolverService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { id: subjectId } = context.switchToHttp().getRequest().params;
    const policyHandlers =
      this.reflector.get<PolicyHandlerCallback<ObjectLiteral>[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { currentUser } = context.switchToHttp().getRequest();

    let subjectEntity: ObjectLiteral;
    if (subjectId) {
      subjectEntity = await this.subjectResolverService.resolveSubject(subjectId);
    }
    return policyHandlers.every(handler => this.execPolicyHandler(handler, currentUser, subjectEntity), true);
  }

  private execPolicyHandler(
    handler: PolicyHandlerCallback<ObjectLiteral>,
    user: UserEntity,
    subjectEntity?: ObjectLiteral,
  ) {
    return handler(user, subjectEntity);
  }
}
