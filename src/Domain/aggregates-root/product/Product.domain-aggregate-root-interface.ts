import { BaseDomainEntity } from '../../../Shared';
import { ProductCategory } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';

export interface ProductProps extends BaseDomainEntity {
  description: string;
  category: ProductCategory;
  images: ImageValueObject[];
  isSpecial: boolean;
  price: MonetaryValueObject;
  isActive: boolean;
  info: string;
  quantityAvaliable: number;
}
