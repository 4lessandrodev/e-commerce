import { BaseDomainEntity } from '../../../Shared';
import { BasketCategory, Comment, Tag } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
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
