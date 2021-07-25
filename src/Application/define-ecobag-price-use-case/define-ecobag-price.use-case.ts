import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { EcobagRepositoryInterface } from '@repo/ecobag.repository.interface';
import { DefineEcobagPriceDto } from './define-ecobag-price-use-case.dto';
import { Ecobag } from '@domain/entities';
import { Currency, MonetaryValueObject } from '@domain/value-objects';

@Injectable()
export class DefineEcobagPriceUseCase
	implements IUseCase<DefineEcobagPriceDto, Result<void>>
{
	constructor(
		@Inject('EcobagRepository')
		private readonly ecobagRepo: EcobagRepositoryInterface
	) {}

	async execute(dto: DefineEcobagPriceDto): Promise<Result<void>> {
		try {
			const currencyOrError = Currency.create(dto.price);

			if (currencyOrError.isFailure) {
				return Result.fail<void>(currencyOrError.error.toString());
			}

			const currency = currencyOrError.getResult();

			const priceOrError = MonetaryValueObject.create(currency);

			if (priceOrError.isFailure) {
				return Result.fail<void>(priceOrError.error.toString());
			}

			const price = priceOrError.getResult();

			const ecobagOrError = Ecobag.create(price);

			if (ecobagOrError.isFailure) {
				return Result.fail<void>(ecobagOrError.error.toString());
			}

			const ecobag = ecobagOrError.getResult();

			await this.ecobagRepo.definePrice(ecobag);

			return Result.ok<void>();

			//
		} catch (error) {
			return Result.fail<void>(
				'Internal Server Error on Define Ecobag Price Use Case'
			);
		}
	}
}
