import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@user/dto';
import { AuthGuard } from '../../app/guard';
import { CheckPolicies } from '@decorator/check-policy.decorator';
import { UserPolicy } from '@user/policy/user.policy';
import { ActionEnum } from '@constant/enum';
import { PolicyGuard } from '@guard/policy.guard';

@Controller('user')
@UseGuards(AuthGuard, PolicyGuard)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/')
  @CheckPolicies(UserPolicy[ActionEnum.LIST])
  getAllUsers() {
    return this.userService.getAll();
  }

  @Post('/')
  @CheckPolicies(UserPolicy[ActionEnum.CREATE])
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  @CheckPolicies(UserPolicy[ActionEnum.UPDATE])
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @CheckPolicies(UserPolicy[ActionEnum.DELETE])
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
