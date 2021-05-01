import { AddressComplementValueObject } from './AddressComplement.value-object';

describe('AddressComplement.value-object', () => {
  it('should be defined', () => {
    const street = AddressComplementValueObject.create('street name');
    expect(street).toBeDefined();
  });

  it('should fail if description length is greater than 40 characters', () => {
    const street = AddressComplementValueObject.create(
      'invalid_long_description'.repeat(10),
    );
    expect(street.isFailure).toBe(true);
  });

  it('should not fail if provide empty', () => {
    const street = AddressComplementValueObject.create('');
    expect(street.isFailure).toBe(false);
  });

  it('should create a valid address complement', () => {
    const street = AddressComplementValueObject.create('valid description');
    expect(street.isSuccess).toBe(true);
  });
});
