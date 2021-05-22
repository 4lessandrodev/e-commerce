import { ImageValueObject } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';
import { AvailableInitialsType } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';
import { BaseDomainEntity } from 'types-ddd';

export interface ProductProps extends BaseDomainEntity {
  description: ProductDescriptionValueObject;
  image?: ImageValueObject;
  unitOfMeasurement: AvailableInitialsType;
  category: ProductCategory;
  isSpecial: boolean;
  price: MonetaryValueObject;
  quantity: QuantityAvailableValueObject;
}
