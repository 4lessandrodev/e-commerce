import { UpdateCollectionAddressDto } from './update-collection-address-use-case.dto';
import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result, UniqueEntityID } from 'types-ddd';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import {
	StreetNameValueObject,
	ZipCodeValueObject,
	AddressComplementValueObject,
	AddressNumberValueObject
} from '@domain/value-objects';

import { RegionId } from '@domain/aggregates-root';

@Injectable()
export class UpdateCollectionAddressUseCase
	implements IUseCase<UpdateCollectionAddressDto, Result<void>>
{
	constructor(
		@Inject('CollectionAddressRepository')
		private readonly collectionAddressRepo: CollectionAddressRepositoryInterface
	) {}

	async execute(dto: UpdateCollectionAddressDto): Promise<Result<void>> {
		const id = dto.id;

		const complementOrError = AddressComplementValueObject.create(
			dto.complement
		);
		const numberOrError = AddressNumberValueObject.create(dto.number);
		const streetOrError = StreetNameValueObject.create(dto.street);
		const zipCodeOrError = ZipCodeValueObject.create(dto.zipCode);

		const checkValueObjects = Result.combine([
			complementOrError,
			numberOrError,
			streetOrError,
			zipCodeOrError
		]);

		if (checkValueObjects.isFailure) {
			return Result.fail<void>(checkValueObjects.error);
		}

		const complement = complementOrError.getResult();
		const number = numberOrError.getResult();
		const street = streetOrError.getResult();
		const zipCode = zipCodeOrError.getResult();

		const regionId = RegionId.create(new UniqueEntityID(dto.regionId));

		const addressOrError = DeliveryOrCollectionAddress.create(
			{
				regionId,
				complement,
				number,
				street,
				zipCode
			},
			new UniqueEntityID(id)
		);

		if (addressOrError.isFailure) {
			return Result.fail<void>(addressOrError.error.toString());
		}

		const address = addressOrError.getResult();

		try {
			const addressExists = await this.collectionAddressRepo.exists({
				id
			});

			if (!addressExists) {
				return Result.fail<void>('Address does not exists');
			}

			await this.collectionAddressRepo.save(address);
			return Result.ok<void>();
		} catch (error) {
			return Result.fail<void>(
				'Internal Server Error on Update Collection Address Use Case'
			);
		}
	}
}
