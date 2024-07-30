import { OmitType } from '@nestjs/swagger';
import { ProductEntity } from '../model/product.entity';

export class CreateProductDto extends OmitType(ProductEntity, ['id']) {
}
