import { SetMetadata } from '@nestjs/common';
import { PolicyHandlerCallback } from '@type/policy-handler.type';
import { ObjectLiteral } from 'typeorm';

export const CHECK_POLICIES_KEY = 'check_policy';
export const CheckPolicies = (...handlers: PolicyHandlerCallback<ObjectLiteral>[]) =>
  SetMetadata(CHECK_POLICIES_KEY, handlers);
