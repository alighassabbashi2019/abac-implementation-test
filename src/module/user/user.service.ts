import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '@user/model/user/user.repository';
import { UserEntity } from '@user/model/user/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {
  }

  getAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  getById(id: string, relations: string[] = []): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id }, relations });
  }

  getByUsername(username: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username } });
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.delete({ id });
  }
}
