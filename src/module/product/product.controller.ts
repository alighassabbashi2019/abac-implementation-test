import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './model/product.entity';
import { CreateProductDto } from './dto';
import { AuthGuard } from '@guard/auth.guard';
import { CheckPolicies } from '@decorator/check-policy.decorator';
import { ListProductsPolicy } from '@product/policy';
import { PolicyGuard } from '@guard/policy.guard';

@Controller('product')
@UseGuards(AuthGuard, PolicyGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('/')
  @CheckPolicies(new ListProductsPolicy())
  getAllProducts() {
    return this.productService.findAll();
  }

  @Post('/')
  createProduct(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productService.create(createProductDto);
  }
}
