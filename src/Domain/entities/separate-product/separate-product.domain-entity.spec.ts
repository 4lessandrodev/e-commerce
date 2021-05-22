import {
  Currency,
  ImageValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityInStockValueObject,
} from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';
import { SeparateProduct } from './separate-product.domain-entity';

describe('separate-product.domain-entity', () => {
  it('should be defined', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'RJ',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 21,
        }).getResult(),
      ).getResult(),
      quantity: QuantityInStockValueObject.create(10).getResult(),
    });
    expect(separateProduct.getResult()).toBeDefined();
  });

  it('should get total as calculated value', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'RJ',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 21,
        }).getResult(),
      ).getResult(),
      quantity: QuantityInStockValueObject.create(10).getResult(),
    }).getResult();
    expect(separateProduct.subTotal.value).toBe(210);
  });

  it('should fail if provide zero quantity', () => {
    const separateProduct = SeparateProduct.create({
      image: ImageValueObject.create('https://aws.com/image.jpeg').getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      unitOfMeasurement: 'RJ',
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      isSpecial: true,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 21,
        }).getResult(),
      ).getResult(),
      quantity: QuantityInStockValueObject.create(0).getResult(),
    });
    expect(separateProduct.isFailure).toBe(true);
  });
});
