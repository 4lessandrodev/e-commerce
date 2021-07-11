import { Inject, PreconditionFailedException } from '@nestjs/common';
import { Result } from 'types-ddd';
import { AddItemToCustomBasketUseCase } from '@app/add-item-to-custom-basket-use-case/add-item-to-custom-basket.use-case';
import { AddItemToCustomBasketDto } from '@app/add-item-to-custom-basket-use-case/add-item-to-custom-basket-use-case.dto';
import { RemoveItemFromCustomBasketUseCase } from '@app/remove-item-from-custom-basket-use-case/remove-item-from-custom-basket.use-case';
import { RemoveItemFromCustomBasketDto } from '@app/remove-item-from-custom-basket-use-case/remove-item-from-custom-basket-use-case.dto';

export class OrderService {
	constructor (
		@Inject(AddItemToCustomBasketUseCase) private readonly addItemToCustomBasketUseCase: AddItemToCustomBasketUseCase,
		@Inject(RemoveItemFromCustomBasketUseCase) private readonly removeItemFromCustomBasketUseCase: RemoveItemFromCustomBasketUseCase
	) { }

	private checkResult (result: Result<void>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async addItemToCustomBasket (dto: AddItemToCustomBasketDto): Promise<void> {
		const result = await this.addItemToCustomBasketUseCase.execute(dto);
		this.checkResult(result);
	}

	async removeItemFromCustomBasket (dto: RemoveItemFromCustomBasketDto): Promise<void> {
		const result = await this.removeItemFromCustomBasketUseCase.execute(dto);
		this.checkResult(result);
	}
}
