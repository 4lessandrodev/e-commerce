import {
  AddressComplementValueObject,
  AddressNumberValueObject,
  Currency,
  MonetaryValueObject,
  OrderIdValueObject,
  OrderStatusValueObject,
  StreetNameValueObject,
  UserNameValueObject,
  ZipCodeValueObject,
} from '@domain/value-objects';
import { DeliveryOrCollectionAddress } from '@domain/entities';
import { RegionId } from '../region/region-id.domain-aggregate-root';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { Order } from './order.domain-aggregate-root';

describe('order.domain-aggregate-root.spec', () => {
  it('should be defined', () => {
    const monetary = MonetaryValueObject.create(
      Currency.create(10).getResult(),
    ).getResult();

    const order = Order.create({
      CostOfFreight: monetary,
      amount: monetary,
      basketPacks: [],
      clientId: UserId.create(),
      clientName: UserNameValueObject.create('valid_name').getResult(),
      customBaskets: [],
      isTheOrderForCollection: true,
      deliveryOrCollectionAddress: DeliveryOrCollectionAddress.create({
        complement:
          AddressComplementValueObject.create('valid_street').getResult(),
        number: AddressNumberValueObject.create('77b').getResult(),
        regionId: RegionId.create(),
        street: StreetNameValueObject.create('valid_street').getResult(),
        zipCode: ZipCodeValueObject.create('75520104').getResult(),
      }).getResult(),
      ecobagFee: monetary,
      includesEcobag: false,
      orderNumber: OrderIdValueObject.create().getResult(),
      separateProducts: [],
      status: OrderStatusValueObject.create('COMPLETED').getResult(),
    });

    expect(order).toBeDefined();
  });
});
