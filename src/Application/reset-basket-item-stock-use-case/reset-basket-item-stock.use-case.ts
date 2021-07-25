import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ResetProductStockDto } from './reset-basket-item-stock.dto';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';

@Injectable()
export class ResetBasketItemStockUseCase
	implements IUseCase<ResetProductStockDto, Result<void>>
{
	//
	constructor(
		@Inject('BasketRepository')
		private readonly basketRepo: BasketRepositoryInterface
	) {}

	async execute(dto: ResetProductStockDto): Promise<Result<void>> {
		try {
			//
			const hasIds = (dto?.productsIds?.length ?? 0) > 0;

			const ids = hasIds ? dto.productsIds : undefined;

			await this.basketRepo.resetStockOnBasketItems(ids);

			return Result.ok<void>();

			//
		} catch (error) {
			//
			return Result.fail<void>(
				'Internal Server Error on Reset Basket Item Stock Use Case'
			);
		}
	}
}
