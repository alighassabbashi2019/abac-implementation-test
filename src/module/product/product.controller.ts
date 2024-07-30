import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './model/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AuthGuard } from '@guard/auth.guard';
import { CheckPolicies } from '@decorator/check-policy.decorator';
import { PolicyGuard } from '@guard/policy.guard';
import { ProductPolicies } from '@product/policy/product.policy';
import { ActionEnum } from '@constant/enum';
import { CurrentUser } from '@decorator/current-user.decorator';
import { UserEntity } from '@user/model/user/user.entity';

@Controller('product')
@UseGuards(AuthGuard, PolicyGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('/')
  @CheckPolicies(ProductPolicies[ActionEnum.LIST])
  getAllProducts() {
    return this.productService.findAll();
  }

  @Post('/')
  @CheckPolicies(ProductPolicies[ActionEnum.CREATE])
  createProduct(
    @CurrentUser() currentUser: UserEntity,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.create(currentUser, createProductDto);
  }

  @Patch('/:id')
  @CheckPolicies(ProductPolicies[ActionEnum.UPDATE])
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(id, updateProductDto);
  }
}
