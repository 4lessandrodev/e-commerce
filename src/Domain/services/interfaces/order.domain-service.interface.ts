import {
	BasketItemValueObject,
	QuantityAvailableValueObject
} from '@domain/value-objects';
import { Result } from 'types-ddd';
import { CustomBasket, Order } from '@domain/aggregates-root';

export interface AddProps {
	order: Order;
	item: BasketItemValueObject;
	quantityToAdd: QuantityAvailableValueObject;
	customBasket: CustomBasket;
}

export interface RemoveProps {
	order: Order;
	item: BasketItemValueObject;
	quantityToRemove: QuantityAvailableValueObject;
	customBasket: CustomBasket;
}

export interface OrderDomainServiceInterface {
	addItemToCustomBasket: (props: AddProps) => Result<void>;
	removeItemFromCustomBasket: (props: RemoveProps) => Result<void>;
}
