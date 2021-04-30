import { AddressComplement } from './AddressComplement.value-object';

describe('AddressComplement.value-object', () => {
  it('should be defined', () => {
    const street = AddressComplement.create('street name');
    expect(street).toBeDefined();
  });

  it('should fail if description length is greater than 40 characters', () => {
    const street = AddressComplement.create(
      'invalid_long_description'.repeat(10),
    );
    expect(street.isFailure).toBe(true);
  });

  it('should not fail if provide empty', () => {
    const street = AddressComplement.create('');
    expect(street.isFailure).toBe(false);
  });

  it('should create a valid address complement', () => {
    const street = AddressComplement.create('valid description');
    expect(street.isSuccess).toBe(true);
  });
});
