import { BasketDescriptionValueObject } from './BasketDescription.value-object';

describe('BasketDescription.value-object', () => {
  //
  it('should be defined', () => {
    const basketDescription =
      BasketDescriptionValueObject.create('valid_description');
    expect(basketDescription).toBeDefined();
  });

  it('should fail if provide a long description', () => {
    const basketDescription = BasketDescriptionValueObject.create(
      'invalid_description'.repeat(10),
    );
    expect(basketDescription.isFailure).toBe(true);
  });

  it('should create a valid value object', () => {
    const basketDescription =
      BasketDescriptionValueObject.create('valid_description');
    expect(basketDescription.isSuccess).toBe(true);
  });

  it('should lowercase value', () => {
    const basketDescription =
      BasketDescriptionValueObject.create('Valid_Description');
    expect(basketDescription.getResult().value).toBe('valid_description');
  });
});
