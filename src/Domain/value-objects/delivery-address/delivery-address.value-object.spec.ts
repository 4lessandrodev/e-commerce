import { ERROR_CITY_LENGTH_NAME } from '@domain/entities/city/city-errors.domain-entity';
import { DeliveryOrCollectionAddressValueObject } from './delivery-address.value-object';

describe('delivery-address.value-object', () => {
  it('should create a valid address', () => {
    const address = DeliveryOrCollectionAddressValueObject.create({
      city: 'valid_city',
      complement: 'valid_complement',
      number: '70b',
      region: 'valid_region',
      state: 'RJ',
      street: 'valid_street',
      zipCode: '75520-140',
    });

    console.log(address.errorValue());

    expect(address.isSuccess).toBe(true);
  });

  it('should fail if provide an invalid city length', () => {
    const address = DeliveryOrCollectionAddressValueObject.create({
      city: 'invalid_city'.repeat(50),
      complement: 'valid_complement',
      number: '77A',
      region: 'valid_region',
      state: 'RJ',
      street: 'valid_street',
      zipCode: '75520-140',
    });

    expect(address.isFailure).toBe(true);
    expect(address.error).toBe(ERROR_CITY_LENGTH_NAME);
  });

  it('should validate attributes as value object', () => {
    const address = DeliveryOrCollectionAddressValueObject.create({
      city: 'valid_city',
      complement: 'valid_complement',
      number: 'valid_number',
      region: 'valid_region',
      state: 'RJ',
      street: 'valid_street',
      zipCode: 'invalid_zip_code',
    });

    expect(address.isFailure).toBe(true);
  });
});
