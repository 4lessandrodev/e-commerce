import { IUseCase, Result, UniqueEntityID } from 'types-ddd';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { RegisterCollectionAddressDto } from './register-collection-address-use-case.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';
import { StreetNameValueObject } from '@domain/value-objects';
import { ZipCodeValueObject } from '@domain/value-objects';
import { AddressComplementValueObject } from '@domain/value-objects';
import { AddressNumberValueObject } from '@domain/value-objects';
import { RegionId } from '@domain/aggregates-root';

@Injectable()
export class RegisterCollectionAddressUseCase
  implements IUseCase<RegisterCollectionAddressDto, Result<void>>
{
  constructor(
    @Inject('CollectionAddressRepository')
    private readonly collectionAddressRepo: CollectionAddressRepositoryInterface,
  ) {}
  async execute(dto: RegisterCollectionAddressDto): Promise<Result<void>> {
    const complementOrError = AddressComplementValueObject.create(
      dto.complement,
    );
    const numberOrError = AddressNumberValueObject.create(dto.number);
    const streetOrError = StreetNameValueObject.create(dto.street);
    const zipCodeOrError = ZipCodeValueObject.create(dto.zipCode);

    const checkValueObjects = Result.combine([
      complementOrError,
      numberOrError,
      streetOrError,
      zipCodeOrError,
    ]);

    if (checkValueObjects.isFailure) {
      return Result.fail<void>(checkValueObjects.error);
    }

    const complement = complementOrError.getResult();
    const number = numberOrError.getResult();
    const street = streetOrError.getResult();
    const zipCode = zipCodeOrError.getResult();

    const regionId = RegionId.create(new UniqueEntityID(dto.regionId));

    const addressOrError = DeliveryOrCollectionAddress.create({
      regionId,
      complement,
      number,
      street,
      zipCode,
    });

    if (addressOrError.isFailure) {
      return Result.fail<void>(addressOrError.error.toString());
    }

    const address = addressOrError.getResult();

    try {
      await this.collectionAddressRepo.save(address);
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(
        'Internal Server Error on Register Collection Address Use Case',
      );
    }
  }
}
