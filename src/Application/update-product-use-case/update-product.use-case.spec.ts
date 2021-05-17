import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { Product } from '@domain/aggregates-root';
import { UpdateProductUseCase } from './update-product.use-case';
import { ProductCategory } from '@domain/entities';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { QuantityInStockValueObject } from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';

describe('update-product.use-case', () => {
  //

  const product = Product.create({
    category: ProductCategory.create({
      description: 'valid_description',
    }).getResult(),
    description:
      ProductDescriptionValueObject.create('valid_description').getResult(),
    exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
    isActive: false,
    isSpecial: true,
    price: MonetaryValueObject.create(
      Currency.create({
        value: 11,
        symbol: 'BRL',
        locale: 'pt-BR',
      }).getResult(),
    ).getResult(),
    quantityAvailable: QuantityInStockValueObject.create(10).getResult(),
    unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
  }).getResult();

  let productRepo: ProductRepositoryInterface;

  beforeEach(() => {
    productRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findProductsByIds: jest.fn(),
      save: jest.fn(),
      deactivateManyProducts: jest.fn(),
      resetStock: jest.fn(),
    };
  });

  it('should be defined', () => {
    const useCase = new UpdateProductUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should fail if provide an invalid exchange factor', async () => {
    const useCase = new UpdateProductUseCase(productRepo);
    const result = await useCase.execute({
      description: 'valid_description',
      exchangeFactor: 99,
      isActive: true,
      isSpecial: false,
      price: 20,
      productId: 'valid_product_id',
      quantityAvailable: 20,
      unitOfMeasurement: 'LT',
    });
    expect(result.isFailure).toBe(true);
  });

  it('should fail if provide a long info description', async () => {
    const useCase = new UpdateProductUseCase(productRepo);
    const result = await useCase.execute({
      description: 'valid_description',
      exchangeFactor: 2,
      isActive: true,
      isSpecial: false,
      price: 20,
      productId: 'valid_product_id',
      quantityAvailable: 20,
      unitOfMeasurement: 'LT',
      info: 'invalid_info_as_long_value'.repeat(20),
    });
    expect(result.isFailure).toBe(true);
  });

  it('should fail if product does not exists', async () => {
    jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new UpdateProductUseCase(productRepo);
    const result = await useCase.execute({
      description: 'valid_description',
      exchangeFactor: 2,
      isActive: true,
      isSpecial: false,
      price: 20,
      productId: 'valid_product_id',
      quantityAvailable: 20,
      unitOfMeasurement: 'LT',
      info: 'valid_info',
    });
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product does not exists');
  });

  it('should update product with success', async () => {
    jest.spyOn(productRepo, 'findOne').mockResolvedValueOnce(product);
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(false);

    const useCase = new UpdateProductUseCase(productRepo);
    const result = await useCase.execute({
      description: 'new_valid_description',
      exchangeFactor: 2,
      isActive: true,
      isSpecial: false,
      price: 20,
      productId: 'valid_product_id',
      quantityAvailable: 77,
      unitOfMeasurement: 'LT',
      info: 'new_valid_info',
    });
    expect(result.isSuccess).toBe(true);

    expect(product.description.value).toBe('new_valid_description');
    expect(product.exchangeFactor.value).toBe(2);
    expect(product.isActive).toBe(true);
    expect(product.isSpecial).toBe(false);
    expect(product.price.value).toBe(20);
    expect(product.quantityAvailable.value).toBe(77);
    expect(product.unitOfMeasurement.value).toBe('LT');
    expect(product.info?.value).toBe('new_valid_info');
  });
});
