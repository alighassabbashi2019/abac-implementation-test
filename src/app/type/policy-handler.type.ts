import { UserEntity } from '@user/model/user/user.entity';

export interface IPolicyHandler {
  handle(ability: UserEntity): boolean;
}

export type PolicyHandlerCallback = (user: UserEntity) => boolean;

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
