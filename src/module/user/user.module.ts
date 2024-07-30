import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/model/user/user.repository';
import { SubjectResolverModule } from '../../app/module/subject-resolver/subject-resolver.module';
import { SubjectEnum } from '@constant/enum';

const repositories = [UserRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    SubjectResolverModule.forFeature({
      subject: SubjectEnum.USER,
      repositories: [UserRepository],
    }),
  ],
  controllers: [UserController],
  providers: [...repositories, UserService],
  exports: [UserService],
})
export class UserModule {
}
