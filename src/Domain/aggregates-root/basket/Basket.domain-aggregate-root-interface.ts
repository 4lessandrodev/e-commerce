import { BaseDomainEntity } from 'types-ddd';
import { BasketCategory, Comment, Tag } from '@domain/entities';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { ProductId } from '@domain/aggregates-root';

//exchange factor

export interface BasketProps extends BaseDomainEntity {
  description: string;
  category: BasketCategory;
  price: MonetaryValueObject;
  isActive: boolean;
  images?: ImageValueObject[];
  numberOfRatings?: number;
  ratingAverage?: number;
  products?: ProductId[];
  comments?: Comment[];
  info?: string;
  tags?: Tag[];
}
