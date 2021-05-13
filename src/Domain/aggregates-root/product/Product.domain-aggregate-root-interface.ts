import { BaseDomainEntity } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '@domain/entities';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';

export interface ProductProps extends BaseDomainEntity {
  description: string;
  category: ProductCategory;
  exchangeFactor: number;
  unitOfMeasurement: UnitOfMeasurementValueObject;
  isSpecial: boolean;
  price: MonetaryValueObject;
  isActive: boolean;
  quantityAvailable: number;
  image?: ImageValueObject;
  numberOfRatings?: number;
  ratingAverage?: number;
  commentIds?: CommentId[];
  info?: string;
  tags?: Tag[];
}
