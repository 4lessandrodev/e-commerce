import { BaseDomainEntity } from 'types-ddd/dist/src';
import { BasketCategory, Comment, Tag } from '@domain/entities';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { Product } from '../product/Product.domain-aggregate-root';

export interface BasketProps extends BaseDomainEntity {
  description: string;
  category: BasketCategory;
  price: MonetaryValueObject;
  isActive: boolean;
  images: ImageValueObject[];
  numberOfRatings?: number;
  ratingAverage?: number;
  products?: Product[];
  comments?: Comment[];
  info?: string;
  tags?: Tag[];
}
