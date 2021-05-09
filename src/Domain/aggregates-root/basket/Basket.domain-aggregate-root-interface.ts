import { BaseDomainEntity } from 'types-ddd';
import { BasketCategory, Comment, Tag } from '@domain/entities';
import {
  ImageValueObject,
  MonetaryValueObject,
  BasketItemValueObject,
} from '@domain/value-objects';

export interface BasketProps extends BaseDomainEntity {
  description: string;
  category: BasketCategory;
  price: MonetaryValueObject;
  isActive: boolean;
  images?: ImageValueObject[];
  numberOfRatings?: number;
  ratingAverage?: number;
  items?: BasketItemValueObject[];
  comments?: Comment[];
  info?: string;
  tags?: Tag[];
}
