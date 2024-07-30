import { ResourcePolicy } from '@type/policy-handler.type';
import { ActionEnum, RoleEnum } from '@constant/enum';
import { UserEntity } from '@user/model/user/user.entity';

export const UserPolicy: ResourcePolicy<UserEntity> = {
  [ActionEnum.MANAGE]: (user: UserEntity) => user.role.name === RoleEnum.SUPER_ADMIN,
  [ActionEnum.READ]: (user: UserEntity, resourceUser: UserEntity) => {
    const isCustomer = user.role.name === RoleEnum.CUSTOMER;
    const isAdminOrSuperAdmin = [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN].includes(user.role.name);
    if (isAdminOrSuperAdmin) {
      return true;
    } else if (isCustomer) {
      return user.id === resourceUser.id;
    }
    return false;
  },
  [ActionEnum.LIST]: (user: UserEntity) => {
    return [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN].includes(user.role.name);
  },
  [ActionEnum.LIST_FILTERED]: (user: UserEntity) => {
    return [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN].includes(user.role.name);
  },
  [ActionEnum.CREATE]: (user: UserEntity) => {
    return [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.CUSTOMER].includes(user.role.name);
  },
  [ActionEnum.UPDATE]: (user: UserEntity, resourceUser: UserEntity) => {
    const isAdminOrSuperAdmin = [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN].includes(user.role.name);
    const isCustomer = user.role.name === RoleEnum.CUSTOMER;
    if (isAdminOrSuperAdmin) {
      return true;
    } else if (isCustomer) {
      return resourceUser?.id === user.id;
    }
    return false;
  },
  [ActionEnum.DELETE]: (user: UserEntity) => {
    return user.role.name === RoleEnum.SUPER_ADMIN;
  },
};
