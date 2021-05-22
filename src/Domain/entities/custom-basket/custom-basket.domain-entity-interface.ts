import { BasketId } from '@domain/aggregates-root';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { BasketDescriptionValueObject } from '@domain/value-objects';
import { BasketItemValueObject } from '@domain/value-objects';
import { BasketCategory } from '@domain/entities';
import { BaseDomainEntity } from 'types-ddd';

export interface CustomBasketProps extends BaseDomainEntity {
  basketId: BasketId;
  image?: ImageValueObject;
  description: BasketDescriptionValueObject;
  category: BasketCategory;
  currentItems: BasketItemValueObject[];
  itemsAdded: BasketItemValueObject[];
  itemsRemoved: BasketItemValueObject[];
  price: MonetaryValueObject;
  quantity: QuantityAvailableValueObject;
}
