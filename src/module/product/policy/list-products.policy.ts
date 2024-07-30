import { IPolicyHandler } from '../../../app/type';
import { UserEntity } from '@user/model/user/user.entity';
import { RoleEnum } from '@constant/enum';

export class ListProductsPolicy implements IPolicyHandler {
  handle(user: UserEntity): boolean {
    return user.role.name === RoleEnum.ADMIN;
  }
}
