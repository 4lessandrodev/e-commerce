import { ZipCodeValueObject } from './ZipCode.value-object';

describe('ZipCode.value-object', () => {
  it('should be defined', () => {
    const zipCode = ZipCodeValueObject.create('75520140');
    expect(zipCode).toBeDefined();
  });

  it('should fail if provide an invalid zip code', () => {
    const zipCode = ZipCodeValueObject.create('invalid_zip_code');
    expect(zipCode.isFailure).toBe(true);
  });

  it('should create a valid zip code with success', () => {
    const zipCode = ZipCodeValueObject.create('75520-140');
    const value = zipCode.getResult().value;
    expect(zipCode.isSuccess).toBe(true);
    expect(value).toBe('75520140');
  });

  it('should create a valid zip code without hyphen', () => {
    const zipCode = ZipCodeValueObject.create('75520140');
    const value = zipCode.getResult().value;
    expect(zipCode.isSuccess).toBe(true);
    expect(value).toBe('75520140');
  });
});
