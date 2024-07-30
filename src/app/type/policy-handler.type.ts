import { UserEntity } from '@user/model/user/user.entity';
import { ActionEnum } from '@constant/enum';

export type PolicyHandlerCallback<T> = (user: UserEntity, resource?: T) => boolean;

export type ResourcePolicy<T> = Record<ActionEnum, PolicyHandlerCallback<T>>;
