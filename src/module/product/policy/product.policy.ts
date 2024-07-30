import { ActionEnum, RoleEnum } from '@constant/enum';
import { ResourcePolicy } from '@type/policy-handler.type';
import { ProductEntity } from '@product/model/product.entity';
import { UserEntity } from '@user/model/user/user.entity';
import { ProductType } from '@product/constant';

export const ProductPolicies: ResourcePolicy<ProductEntity> = {
  [ActionEnum.MANAGE]: (user: UserEntity) => user.role.name === RoleEnum.SUPER_ADMIN,
  [ActionEnum.READ]: (user: UserEntity) => {
    return !!user.role;
  },
  [ActionEnum.LIST]: (user: UserEntity) => {
    return [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.SELLER].includes(user.role.name);
  },
  [ActionEnum.LIST_FILTERED]: (user: UserEntity) => {
    return !!user.role;
  },
  [ActionEnum.CREATE]: (user: UserEntity) => {
    return [RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.SELLER].includes(user.role.name);
  },
  [ActionEnum.UPDATE]: (user: UserEntity, product: ProductEntity) => {
    const isSuperAdmin = user.role.name === RoleEnum.SUPER_ADMIN;
    const isAdmin = user.role.name === RoleEnum.ADMIN;
    const isSeller = user.role.name === RoleEnum.SELLER;
    if (isSuperAdmin) {
      return true;
    } else if (isAdmin) {
      return product?.type === ProductType.INTERNAL;
    } else if (isSeller) {
      return product?.ownerId === user.id;
    }
    return false;
  },
  [ActionEnum.DELETE]: (user: UserEntity) => {
    return [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN].includes(user.role.name);
  },
};
