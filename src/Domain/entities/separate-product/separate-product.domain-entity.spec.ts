import {
  Currency,
  ImageValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityAvailableValueObject,
} from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';
import { SeparateProduct } from './separate-product.domain-entity';

describe('separate-product.domain-entity', () => {
  it('should be defined', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'KG',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create(21).getResult(),
      ).getResult(),
      quantity: QuantityAvailableValueObject.create(10).getResult(),
    });
    expect(separateProduct.getResult()).toBeDefined();
  });

  it('should get total as calculated value', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'KG',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create(21).getResult(),
      ).getResult(),
      quantity: QuantityAvailableValueObject.create(10).getResult(),
    }).getResult();
    expect(separateProduct.subTotal.value).toBe(210);
  });

  it('should fail if provide zero quantity', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'KG',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create(21).getResult(),
      ).getResult(),
      quantity: QuantityAvailableValueObject.create(0).getResult(),
    });
    expect(separateProduct.isFailure).toBe(true);
  });
});
