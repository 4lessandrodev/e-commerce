import {
  Currency,
  DeliveryAddressValueObject,
  MonetaryValueObject,
  OrderStatusValueObject,
  UserNameValueObject,
} from '@domain/value-objects';
import { UserId } from '../user/UserId.domain-aggregate-root';
import { Order } from './order.domain-aggregate-root';

describe('order.domain-aggregate-root.spec', () => {
  it('should be defined', () => {
    const monetary = MonetaryValueObject.create(
      Currency.create({
        locale: 'pt-BR',
        symbol: 'BRL',
        value: 10,
      }).getResult(),
    ).getResult();

    const order = Order.create({
      CostOfFreight: monetary,
      amount: monetary,
      basketPacks: [],
      clientId: UserId.create(),
      clientName: UserNameValueObject.create('valid_name').getResult(),
      customBaskets: [],
      deliveryAddress: DeliveryAddressValueObject.create({
        city: 'valid_city',
        complement: 'valid_complement',
        number: '70b',
        region: 'valid_region',
        state: 'RJ',
        street: 'valid_street',
        zipCode: '75520-140',
      }).getResult(),
      ecobagFee: monetary,
      includesEcobag: false,
      orderNumber: 1,
      separateProducts: [],
      status: OrderStatusValueObject.create('COMPLETED').getResult(),
    });

    expect(order).toBeDefined();
  });
});
