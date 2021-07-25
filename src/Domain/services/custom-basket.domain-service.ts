import { Result } from 'types-ddd';
import {
	BasketItemValueObject,
	QuantityAvailableValueObject
} from '@domain/value-objects';

import {
	AddProps,
	RemoveProps,
	CustomBasketDomainServiceInterface
} from './interfaces/custom-basket-domain-service.interface';

export class CustomBasketDomainService
	implements CustomBasketDomainServiceInterface
{
	//
	addItemToCustomBasket(props: AddProps): Result<void> {
		//
		const customBasket = props.customBasket;
		const item = props.item;
		const quantity = props.quantityToAdd;

		/**
		 * to add one item must to have changes limit available
		 * and the sum of exchange factor on removed item must be greater than 0
		 */
		const canAddNewItems =
			customBasket.changesLimitAvailable > 0 &&
			customBasket.exchangesFactorAvailable > 0;

		if (!canAddNewItems) {
			return Result.fail<void>(
				'Reached Changes limit or Exchange Factor'
			);
		}

		const basketAlreadyHasItem = customBasket.currentItems.find(
			({ value }) => value.productId.id.equals(item.value.productId.id)
		);

		// The item already on custom basket just increment quantity
		if (basketAlreadyHasItem) {
			const updatedQuantityOfItems =
				basketAlreadyHasItem.value.quantity.value + quantity.value;

			const updatedQuantityOfItemsOrError =
				QuantityAvailableValueObject.create(updatedQuantityOfItems);

			if (updatedQuantityOfItemsOrError.isFailure) {
				return Result.fail<void>(
					updatedQuantityOfItemsOrError.error.toString()
				);
			}

			const updatedQuantity = updatedQuantityOfItemsOrError.getResult();

			const itemToAddOrError = BasketItemValueObject.create({
				...item.value,
				quantity: updatedQuantity
			});

			if (itemToAddOrError.isFailure) {
				return Result.fail<void>(itemToAddOrError.error.toString());
			}

			const itemToAdd = itemToAddOrError.getResult();

			// Remove old value object and add a new one with updated quantity
			customBasket.updateOrAddOneCurrentItemOnCustomBasket(itemToAdd);

			// Add item added
			customBasket.updateOrAddOneAddedItemOnCustomBasket(
				BasketItemValueObject.create({
					...item.value,
					quantity
				}).getResult()
			);

			// if it is not original item count as an added item. One change
			customBasket.updateOrAddOneAddedItemOnCustomBasket(itemToAdd);
			return Result.ok<void>();
		}

		// just add item
		customBasket.updateOrAddOneCurrentItemOnCustomBasket(item);

		// Add item added
		customBasket.updateOrAddOneAddedItemOnCustomBasket(
			BasketItemValueObject.create({
				...item.value,
				quantity
			}).getResult()
		);

		return Result.ok<void>();
	}

	removeItemFromCustomBasket(props: RemoveProps): Result<void> {
		//
		const customBasket = props.customBasket;
		const item = props.item;
		const quantity = props.quantityToRemove;

		/**
		 * to add one item must to have changes limit available
		 * and the sum of exchange factor on removed item must be greater than 0
		 */
		const canRemoveNewItems = customBasket.changesLimitAvailable > 0;

		if (!canRemoveNewItems) {
			return Result.fail<void>('Reached Changes limit');
		}

		const itemExistOnBasket = customBasket.currentItems.find(({ value }) =>
			value.productId.id.equals(item.value.productId.id)
		);

		if (!itemExistOnBasket) {
			return Result.fail<void>('Item does not exists on Custom Basket');
		}

		const isQuantityGreaterThanAvailable =
			itemExistOnBasket.value.quantity.value > quantity.value;

		if (!isQuantityGreaterThanAvailable) {
			customBasket.removeItemFromCurrentItemOnCustomBasket(item);
			customBasket.updateOrAddOneRemovedItemOnCustomBasket(item);
			return Result.ok<void>();
		}

		const updatedQuantity =
			itemExistOnBasket.value.quantity.value - quantity.value;

		const quantityOrError =
			QuantityAvailableValueObject.create(updatedQuantity);

		if (quantityOrError.isFailure) {
			return Result.fail<void>(quantityOrError.error.toString());
		}

		const quantityToUpdate = quantityOrError.getResult();

		const itemToUpdateOrError = BasketItemValueObject.create({
			...item.value,
			quantity: quantityToUpdate
		});

		if (itemToUpdateOrError.isFailure) {
			return Result.fail<void>(itemToUpdateOrError.error.toString());
		}

		const itemToUpdate = itemToUpdateOrError.getResult();

		customBasket.updateOrAddOneCurrentItemOnCustomBasket(itemToUpdate);
		customBasket.updateOrAddOneRemovedItemOnCustomBasket(
			BasketItemValueObject.create({
				...item.value,
				quantity
			}).getResult()
		);

		customBasket.updateOrAddOneRemovedItemOnCustomBasket(item);
		return Result.ok<void>();
	}
}
