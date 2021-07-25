import { Inject, Injectable } from '@nestjs/common';
import { Result } from 'types-ddd';
import { CustomBasketDomainService } from './custom-basket.domain-service';
import { CustomBasketDomainServiceInterface } from './interfaces/custom-basket-domain-service.interface';
import {
	AddProps,
	RemoveProps,
	OrderDomainServiceInterface
} from './interfaces/order.domain-service.interface';

@Injectable()
export class OrderDomainService implements OrderDomainServiceInterface {
	constructor(
		@Inject(CustomBasketDomainService)
		private readonly customBasketDomainService: CustomBasketDomainServiceInterface
	) {}

	addItemToCustomBasket(props: AddProps): Result<void> {
		//
		const customBasket = props.customBasket;
		const item = props.item;
		const quantityToAdd = props.quantityToAdd;

		const addedItemOrError =
			this.customBasketDomainService.addItemToCustomBasket({
				customBasket,
				item,
				quantityToAdd
			});
		if (addedItemOrError.isFailure) {
			return addedItemOrError;
		}
		// update item, remove old and add updated one
		props.order.updateCustomBasket(customBasket);
		return Result.ok<void>();
	}

	removeItemFromCustomBasket(props: RemoveProps): Result<void> {
		//
		const customBasket = props.customBasket;
		const item = props.item;
		const quantityToRemove = props.quantityToRemove;

		const removedItemOrError =
			this.customBasketDomainService.removeItemFromCustomBasket({
				customBasket,
				item,
				quantityToRemove
			});
		if (removedItemOrError.isFailure) {
			return removedItemOrError;
		}
		// update item, remove old and add updated one
		props.order.updateCustomBasket(customBasket);
		return Result.ok<void>();
	}
}
