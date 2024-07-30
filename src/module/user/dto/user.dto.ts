import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '@user/model/user/user.entity';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
  constructor(obj: Partial<CreateUserDto>) {
    super();
    Object.assign(this, obj);
  }
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
}
