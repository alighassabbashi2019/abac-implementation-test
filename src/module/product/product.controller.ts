import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductEntity } from './model/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AuthGuard } from '@guard/auth.guard';
import { PolicyGuard } from '@guard/policy.guard';
import { ActionEnum, Resource } from '@constant/enum';
import { CurrentUser } from '@decorator/current-user.decorator';
import { UserEntity } from '@user/model/user/user.entity';
import { AbacResource } from '@decorator/abac-resource.decorator';
import { AbacAction } from '@decorator/abac-action.decorator';

@Controller('product')
@UseGuards(AuthGuard, PolicyGuard)
@AbacResource(Resource.PRODUCT)
export class ProductController {
  constructor(private readonly productService: ProductService) {
  }

  @Get('/')
  @AbacAction(ActionEnum.LIST)
  getAllProducts() {
    return this.productService.findAll();
  }

  @Post('/')
  @AbacAction(ActionEnum.CREATE)
  createProduct(
    @CurrentUser() currentUser: UserEntity,
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.create(currentUser, createProductDto);
  }

  @Patch('/:id')
  @AbacAction(ActionEnum.UPDATE)
  updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.productService.update(id, updateProductDto);
  }
}
