import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './model/product.repository';
import { ProductEntity } from './model/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { UserEntity } from '@user/model/user/user.entity';
import { RoleEnum } from '@constant/enum';
import { ProductType } from '@product/constant';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  create(currentUser: UserEntity, createProductDto: CreateProductDto): Promise<ProductEntity> {
    createProductDto.type = [RoleEnum.ADMIN, RoleEnum.SUPER_ADMIN].includes(currentUser.role.name)
      ? ProductType.INTERNAL
      : ProductType.MARKET;
    createProductDto.ownerId = currentUser.id;
    return this.productRepository.save(this.productRepository.create(createProductDto));
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }
}
