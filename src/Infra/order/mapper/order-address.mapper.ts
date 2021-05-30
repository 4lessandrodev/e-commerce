import { IMapper, UniqueEntityID } from 'types-ddd';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { OrderAddress } from '../entities/order-address.schema';
import { RegionId } from '@domain/aggregates-root';
import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  StreetNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';

export class OrderAddressMapper
  implements IMapper<DeliveryOrCollectionAddress, OrderAddress>
{
  toDomain(target: OrderAddress): DeliveryOrCollectionAddress {
    return DeliveryOrCollectionAddress.create({
      regionId: RegionId.create(new UniqueEntityID(target.regionId)),
      complement: AddressComplementValueObject.create(
        target.complement,
      ).getResult(),
      number: AddressNumberValueObject.create(target.number).getResult(),
      street: StreetNameValueObject.create(target.street).getResult(),
      zipCode: ZipCodeValueObject.create(target.zipCode).getResult(),
    }).getResult();
  }
  //
  toPersistence(target: DeliveryOrCollectionAddress): OrderAddress {
    return {
      complement: target.complement.value,
      number: target.number.value,
      regionId: target.regionId.id.toString(),
      street: target.street.value,
      zipCode: target.zipCode.value,
    };
  }
}
