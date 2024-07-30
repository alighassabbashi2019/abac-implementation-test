import { Injectable } from '@nestjs/common';
import { ProductRepository } from './model/product.repository';
import { ProductEntity } from './model/product.entity';
import { CreateProductDto } from './dto';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {
  }

  findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productRepository.save(this.productRepository.create(createProductDto));
  }
}
