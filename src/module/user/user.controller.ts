import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@user/dto';
import { AuthGuard } from '../../app/guard';
import { ActionEnum, Resource } from '@constant/enum';
import { PolicyGuard } from '@guard/policy.guard';
import { AbacResource } from '@decorator/abac-resource.decorator';
import { AbacAction } from '@decorator/abac-action.decorator';

@Controller('user')
@UseGuards(AuthGuard, PolicyGuard)
@AbacResource(Resource.USER)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get('/')
  @AbacAction(ActionEnum.LIST)
  getAllUsers() {
    return this.userService.getAll();
  }

  @Post('/')
  @AbacAction(ActionEnum.CREATE)
  createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  @AbacAction(ActionEnum.UPDATE)
  updateUser(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('/:id')
  @AbacAction(ActionEnum.DELETE)
  deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.userService.delete(id);
  }
}
