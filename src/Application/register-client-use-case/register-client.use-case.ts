import { Injectable, Inject } from '@nestjs/common';
import { IUseCase, Result, UniqueEntityID } from 'types-ddd';
import { RegisterClientDto } from './register-client.use-case.dto';
import { Client, RegionId, UserId } from '@domain/aggregates-root';
import { Address } from '@domain/entities';
import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import {
	ImageValueObject,
	ZipCodeValueObject,
	AddressComplementValueObject,
	AddressNumberValueObject,
	StreetNameValueObject,
	UserNameValueObject
} from '@domain/value-objects';

@Injectable()
export class RegisterClientUseCase
	implements IUseCase<RegisterClientDto, Result<void>>
{
	/**
	 *
	 * @todo inject upload image service
	 */
	constructor(
		@Inject('ClientRepository')
		private readonly clientRepo: ClientRepositoryInterface,
		@Inject('RegionRepository')
		private readonly regionRepo: RegionRepositoryInterface
	) {}

	async execute(dto: RegisterClientDto): Promise<Result<void>> {
		//
		// Compose Client value objects
		const nameOrError = UserNameValueObject.create(dto.name);
		const hasEcobag = dto.hasEcobag;

		// Compose address value objects
		const zipCodeOrError = ZipCodeValueObject.create(dto.address.zipCode);
		const streetOrError = StreetNameValueObject.create(dto.address.street);
		const numberOrError = AddressNumberValueObject.create(
			dto.address.number
		);
		const region = RegionId.create(
			new UniqueEntityID(dto.address.regionId)
		);
		const complementOrError = AddressComplementValueObject.create(
			dto.address.complement
		);

		// Check all value objects if has error
		const checkValueObjects = Result.combine([
			nameOrError,
			zipCodeOrError,
			streetOrError,
			numberOrError,
			complementOrError
		]);

		if (checkValueObjects.isFailure) {
			return Result.fail<void>(checkValueObjects.error);
		}

		// Create entity Address
		const address = Address.create({
			complement: complementOrError.getResult(),
			isMainAddress: true,
			number: numberOrError.getResult(),
			regionId: region,
			street: streetOrError.getResult(),
			zipCode: zipCodeOrError.getResult()
		});

		try {
			// An user must has only one client profile
			const userAlreadyHasClientProfile = await this.clientRepo.exists({
				id: dto.userId
			});

			if (userAlreadyHasClientProfile) {
				return Result.fail<void>('User already has a client profile');
			}

			const regionExist = await this.regionRepo.exists({
				id: dto.address.regionId
			});

			if (!regionExist) {
				return Result.fail<void>('Region does not exist');
			}
			//

			let avatar: ImageValueObject | undefined;
			// Check if user is uploading an avatar
			if (dto.avatar) {
				/**
				 * @todo call upload avatar service here
				 */
				const uploadedFileURL = dto.avatar.filename;

				const avatarOrError = ImageValueObject.create(uploadedFileURL);
				if (avatarOrError.isSuccess) {
					avatar = avatarOrError.getResult();
				}
			}

			//
			const client = Client.create(
				{
					addresses: [address.getResult()],
					avatar,
					hasEcobag,
					name: nameOrError.getResult()
				},
				UserId.create(new UniqueEntityID(dto.userId)).id
			).getResult();
			//

			await this.clientRepo.save(client);

			return Result.ok<void>();
			//
		} catch (error) {
			//
			return Result.fail<void>(
				'Internal Server Error on Register Client Use Case'
			);
		}
	}
}
