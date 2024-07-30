import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './model/product.repository';
import { UserModule } from '@user/user.module';
import { SubjectResolverModule } from '../../app/module/subject-resolver/subject-resolver.module';
import { SubjectEnum } from '@constant/enum';

const repositories = [ProductRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    UserModule,
    SubjectResolverModule.forFeature({
      subject: SubjectEnum.PRODUCT,
      repositories: [ProductRepository],
    }),
  ],
  controllers: [ProductController],
  providers: [...repositories, ProductService],
  exports: [ProductService],
})
export class ProductModule {
}
