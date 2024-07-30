import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PolicyHandler } from '../type';
import { CHECK_POLICIES_KEY } from '@decorator/check-policy.decorator';
import { UserEntity } from '@user/model/user/user.entity';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
    const { currentUser } = context.switchToHttp().getRequest();

    return policyHandlers.every(handler => this.execPolicyHandler(handler, currentUser), true);
  }

  private execPolicyHandler(handler: PolicyHandler, user: UserEntity) {
    if (typeof handler === 'function') {
      return handler(user);
    }
    return handler.handle(user);
  }
}
