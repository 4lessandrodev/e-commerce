import { AddressNumberValueObject } from './address-number.value-object';

describe('AddressNumber.value-object', () => {
  it('should be defined', () => {
    const street = AddressNumberValueObject.create('7');
    expect(street).toBeDefined();
  });

  it('should fail if description length is greater than 7 characters', () => {
    const street = AddressNumberValueObject.create('77777777');
    expect(street.isFailure).toBe(true);
  });

  it('should fail if provide empty', () => {
    const street = AddressNumberValueObject.create('');
    expect(street.isFailure).toBe(true);
  });

  it('should create a valid address number', () => {
    const street = AddressNumberValueObject.create('777');
    expect(street.isSuccess).toBe(true);
  });
});
