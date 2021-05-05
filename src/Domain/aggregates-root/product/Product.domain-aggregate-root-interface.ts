import { BaseDomainEntity } from 'types-ddd';
import { CommentId, ProductCategory, Tag } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { UnitOfMeasurementValueObject } from '../../value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';

export interface ProductProps extends BaseDomainEntity {
  description: string;
  category: ProductCategory;
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
