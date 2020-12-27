import { BaseDomainEntity } from '../../../Shared';
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
  quantityAvaliable: number;
  numberOfRatings?: number;
  ratingAverage?: number;
  comments?: Comment[];
  info?: string;
  tags?: Tag[];
}
