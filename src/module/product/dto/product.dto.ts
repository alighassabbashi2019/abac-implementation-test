import { OmitType, PartialType } from '@nestjs/swagger';
import { ProductEntity } from '../model/product.entity';

export class CreateProductDto extends OmitType(ProductEntity, ['id']) {
}

export class UpdateProductDto extends PartialType(OmitType(CreateProductDto, ['type'])) {
}
