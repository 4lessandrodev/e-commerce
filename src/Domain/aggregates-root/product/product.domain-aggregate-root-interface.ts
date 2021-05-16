import { BaseDomainEntity } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { ProductInfoValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';
import { QuantityInStockValueObject } from '@domain/value-objects';

export interface ProductProps extends BaseDomainEntity {
  description: ProductDescriptionValueObject;
  category: ProductCategory;
  exchangeFactor: ExchangeFactorValueObject;
  unitOfMeasurement: UnitOfMeasurementValueObject;
  isSpecial: boolean;
  price: MonetaryValueObject;
  isActive: boolean;
  quantityAvailable: QuantityInStockValueObject;
  image?: ImageValueObject;
  numberOfRatings?: number;
  ratingAverage?: number;
  commentIds?: CommentId[];
  info?: ProductInfoValueObject;
  tags?: Tag[];
}
