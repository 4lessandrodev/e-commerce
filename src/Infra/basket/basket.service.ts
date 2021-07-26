import { AddProductsOnBasketDto } from '@app/add-products-on-basket-use-case/add-products-on-basket.dto';
import { RegisterBasketCategoryDto } from '@app/register-basket-category-use-case/register-basket-category.dto';
import { RegisterBasketDto } from '@app/register-basket-use-case/register-basket.dto';
import { RemoveProductsFromBasketDto } from '@app/remove-products-from-basket-use-case/remove-products-from-basket.dto';
import { UpdateBasketDto } from '@app/update-basket-use-case/update-basket.dto';
import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { DeactivateManyBasketsUseCase } from '@app/deactivate-many-baskets-use-case/deactivate-many-baskets.use-case';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import { AddProductsOnBasketUseCase } from '@app/add-products-on-basket-use-case/add-products-on-basket.use-case';
import { RemoveProductsFromBasketUseCase } from '@app/remove-products-from-basket-use-case/remove-products-from-basket.use-case';
import { UpdateBasketUseCase } from '@app/update-basket-use-case/update-basket.use-case';
import {
	Inject,
	Injectable,
	PreconditionFailedException
} from '@nestjs/common';

import { Result } from 'types-ddd';
import { DeactivateManyBasketsDto } from '@app/deactivate-many-baskets-use-case/deactivate-many-baskets.dto';

@Injectable()
export class BasketService {
	constructor(
		@Inject(RegisterBasketCategoryUseCase)
		private readonly registerBasketCategoryUseCase: RegisterBasketCategoryUseCase,

		@Inject(RegisterBasketUseCase)
		private readonly registerBasketUseCase: RegisterBasketUseCase,

		@Inject(AddProductsOnBasketUseCase)
		private readonly addProductsOnBasketUseCase: AddProductsOnBasketUseCase,

		@Inject(RemoveProductsFromBasketUseCase)
		private readonly removeProductsFromBasketUseCase: RemoveProductsFromBasketUseCase,

		@Inject(UpdateBasketUseCase)
		private readonly updateBasketUseCase: UpdateBasketUseCase,

		@Inject(DeactivateManyBasketsUseCase)
		private readonly deactivateManyBasketsUseCase: DeactivateManyBasketsUseCase
	) {}

	private checkResult(result: Result<void>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async registerBasketCategory(
		dto: RegisterBasketCategoryDto
	): Promise<void> {
		const result = await this.registerBasketCategoryUseCase.execute(dto);
		this.checkResult(result);
	}

	async registerBasket(dto: RegisterBasketDto): Promise<void> {
		const result = await this.registerBasketUseCase.execute(dto);
		this.checkResult(result);
	}

	async addProductsOnBasket(dto: AddProductsOnBasketDto): Promise<void> {
		const result = await this.addProductsOnBasketUseCase.execute(dto);
		this.checkResult(result);
	}

	async removeProductsFromBasket(
		dto: RemoveProductsFromBasketDto
	): Promise<void> {
		const result = await this.removeProductsFromBasketUseCase.execute(dto);
		this.checkResult(result);
	}

	async updateBasket(dto: UpdateBasketDto): Promise<void> {
		const result = await this.updateBasketUseCase.execute(dto);
		this.checkResult(result);
	}

	async deactivateAllBaskets(dto: DeactivateManyBasketsDto): Promise<void> {
		const result = await this.deactivateManyBasketsUseCase.execute(dto);
		this.checkResult(result);
	}
}
