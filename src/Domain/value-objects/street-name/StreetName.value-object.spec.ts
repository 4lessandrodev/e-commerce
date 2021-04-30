import { StreetName } from './StreetName.value-object';

describe('StreetName.value-object', () => {
  it('should be defined', () => {
    const street = StreetName.create('street name');
    expect(street).toBeDefined();
  });

  it('should fail if description length is greater than 40 characters', () => {
    const street = StreetName.create('invalid_long_description'.repeat(10));
    expect(street.isFailure).toBe(true);
  });

  it('should create a valid street name', () => {
    const street = StreetName.create('valid description');
    expect(street.isSuccess).toBe(true);
  });
});
