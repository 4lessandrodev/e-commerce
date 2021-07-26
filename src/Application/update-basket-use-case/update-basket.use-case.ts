import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { UpdateBasketDto } from './update-basket.dto';
import {
	Currency,
	MonetaryValueObject,
	BasketInfoValueObject,
	BasketDescriptionValueObject
} from '@domain/value-objects';

export class UpdateBasketUseCase
	implements IUseCase<UpdateBasketDto, Result<void>>
{
	//
	constructor(
		@Inject('BasketRepository')
		private readonly basketRepo: BasketRepositoryInterface
	) {}

	async execute(dto: UpdateBasketDto): Promise<Result<void>> {
		//

		const descriptionOrError = BasketDescriptionValueObject.create(
			dto.description
		);

		if (descriptionOrError.isFailure) {
			return Result.fail<void>(descriptionOrError.error.toString());
		}

		const description = descriptionOrError.getResult();

		// ---------------------------------------------------------
		const infoOrError = dto.info
			? BasketInfoValueObject.create(dto.info)
			: undefined;

		if (infoOrError?.isFailure) {
			return Result.fail<void>(infoOrError.error.toString());
		}
		const info = infoOrError?.getResult();

		// ---------------------------------------------------------
		const currencyOrError = Currency.create(dto.price);

		if (currencyOrError.isFailure) {
			return Result.fail<void>(currencyOrError.error.toString());
		}

		const currency = currencyOrError.getResult();

		// ---------------------------------------------------------

		const priceOrError = MonetaryValueObject.create(currency);

		if (priceOrError.isFailure) {
			return Result.fail<void>(priceOrError.error.toString());
		}

		const price = priceOrError.getResult();

		// ---------------------------------------------------------
		const keepActive = dto.isActive;

		try {
			//
			const alreadyExistsBasketWithDescription =
				await this.basketRepo.exists({
					description: dto.description.toLowerCase()
				});

			if (alreadyExistsBasketWithDescription) {
				return Result.fail<void>(
					`Already exists a basket with description: ${dto.description}`
				);
			}
			//
			const basketExist = await this.basketRepo.findOne({
				id: dto.basketId
			});

			if (!basketExist) {
				return Result.fail<void>('Basket does not exists');
			}

			const basket = basketExist;

			basket.changeDescription(description);
			basket.changePrice(price);

			keepActive ? basket.activate() : basket.deactivate();

			basket.changeInfo(info);

			await this.basketRepo.save(basket);

			return Result.ok<void>();
			//
		} catch (error) {
			//
			console.log(error);

			return Result.fail<void>(
				'Internal Server Error on Update Basket Use Case'
			);
		}
	}
}
