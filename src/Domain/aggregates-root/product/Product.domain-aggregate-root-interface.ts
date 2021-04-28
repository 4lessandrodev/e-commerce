import { BaseDomainEntity } from 'types-ddd';
import { ProductCategory, Tag } from '../../entities';
import { Comment } from '../../entities/comment/Comment.domain-entity';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';

export interface ProductProps extends BaseDomainEntity {
  description: string;
  category: ProductCategory;
  images: ImageValueObject[];
  isSpecial: boolean;
  price: MonetaryValueObject;
  isActive: boolean;
  quantityAvailable: number;
  numberOfRatings?: number;
  ratingAverage?: number;
  comments?: Comment[];
  info?: string;
  tags?: Tag[];
}
