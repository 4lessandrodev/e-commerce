import {
  BasketItemValueObject,
  QuantityAvailableValueObject,
} from '@domain/value-objects';
import { Result } from 'types-ddd';
import { CustomBasket } from '@domain/entities';

export interface AddProps {
  item: BasketItemValueObject;
  quantityToAdd: QuantityAvailableValueObject;
  customBasket: CustomBasket;
}

export interface RemoveProps {
  item: BasketItemValueObject;
  quantityToRemove: QuantityAvailableValueObject;
  customBasket: CustomBasket;
}

export interface CustomBasketDomainServiceInterface {
  addItemToCustomBasket: (props: AddProps) => Result<void>;
  removeItemFromCustomBasket: (props: RemoveProps) => Result<void>;
}
