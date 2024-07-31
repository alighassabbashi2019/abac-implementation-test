import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './model/product.repository';
import { UserModule } from '@user/user.module';
import { ResourceResolverModule } from '../../app/module/resource-resolver/resource-resolver.module';
import { Resource } from '@constant/enum';
import { PolicyRepository } from '@authentication/model/policy/policy.repository';

const repositories = [ProductRepository, PolicyRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(repositories),
    UserModule,
    ResourceResolverModule.forFeature({
      resource: Resource.PRODUCT,
      repositories: [ProductRepository],
    }),
  ],
  controllers: [ProductController],
  providers: [...repositories, ProductService],
  exports: [ProductService],
})
export class ProductModule {
}
