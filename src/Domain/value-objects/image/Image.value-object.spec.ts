import { ERROR_INVALID_URL } from './Image-errors.domain';
import { ImageValueObject } from './Image.value-object';

describe('Image.value-object', () => {
  it('Should return a valid image url', () => {
    const createImageResult = ImageValueObject.create(
      'https://localhost.com.br/images',
    );
    expect(createImageResult.getResult().value).toBe(
      'https://localhost.com.br/images',
    );
    expect(createImageResult.isFailure).toBe(false);
  });

  it('Should fail and return a invalid image url message', () => {
    const createImageResult = ImageValueObject.create('invalidurl');
    expect(createImageResult.isFailure).toBe(true);
    expect(createImageResult.errorValue()).toBe(ERROR_INVALID_URL);
  });
});
