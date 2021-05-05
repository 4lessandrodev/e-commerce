import { IMapper, UniqueEntityID } from 'types-ddd';
import { Address as Entity } from '@domain/entities';
import { Address as Schema } from '../entities/address.schema';
import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  StreetNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';
import { RegionId } from '@domain/aggregates-root';
import { Injectable } from '@nestjs/common';
import { Region } from '@infra/region/entities/region.schema';

@Injectable()
export class AddressMapper implements IMapper<Entity, Schema> {
  toDomain(target: Schema): Entity {
    //
    // The zip code its handling error on validation
    let zipCodeResult = ZipCodeValueObject.create(target.zipCode);
    let zipCode: ZipCodeValueObject;
    //
    if (zipCodeResult.isFailure) {
      zipCode = ZipCodeValueObject.create('00000000').getResult();
    } else {
      zipCode = zipCodeResult.getResult();
    }
    //
    return Entity.create(
      {
        complement: AddressComplementValueObject.create(
          target.street,
        ).getResult(),
        isMainAddress: target.isMainAddress,
        number: AddressNumberValueObject.create(target.number).getResult(),
        regionId: RegionId.create(new UniqueEntityID(target.id)),
        street: StreetNameValueObject.create(target.street).getResult(),
        zipCode,
        createdAt: target.createdAt,
        updatedAt: target.updatedAt,
      },
      new UniqueEntityID(target.id),
    ).getResult();
  }

  toPersistence(target: Entity): Schema {
    //
    const region = new Region();
    region.id = target.regionId.id.toString();

    return {
      id: target.id.toString(),
      complement: target.complement.value,
      isMainAddress: target.isMainAddress,
      number: target.number.value,
      region,
      street: target.street.value,
      zipCode: target.zipCode.value,
      updatedAt: target.updatedAt,
      createdAt: target.createdAt,
    };
  }
}
