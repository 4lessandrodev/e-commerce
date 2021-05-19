import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { Product } from '@domain/aggregates-root';
import { ResetProductStockUseCase } from './reset-product-stock.use-case';
import {
  Currency,
  ExchangeFactorValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityInStockValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { ProductCategory } from '@domain/entities';

describe('reset-product-stock.use-case', () => {
  //
  let productRepo: ProductRepositoryInterface;
  const product = Product.create({
    category: ProductCategory.create({
      description: 'valid_description',
    }).getResult(),
    description:
      ProductDescriptionValueObject.create('valid_description').getResult(),
    exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
    isActive: true,
    isSpecial: false,
    price: MonetaryValueObject.create(
      Currency.create({
        locale: 'pt-BR',
        symbol: 'BRL',
        value: 10,
      }).getResult(),
    ).getResult(),
    quantityAvailable: QuantityInStockValueObject.create(7).getResult(),
    unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
  }).getResult();

  beforeEach(() => {
    productRepo = {
      deactivateManyProducts: jest.fn(),
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      findProductsByIds: jest.fn(),
      save: jest.fn(),
      resetStock: jest.fn(),
      findAllProductsOrFilteredByIds: jest.fn(),
    };
    //
  });

  it('should be defined', () => {
    const useCase = new ResetProductStockUseCase(productRepo);
    expect(useCase).toBeDefined();
  });

  it('should fail if products does not exists', async () => {
    jest
      .spyOn(productRepo, 'findAllProductsOrFilteredByIds')
      .mockResolvedValueOnce(null);

    const useCase = new ResetProductStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: [] });
    expect(result.isFailure).toBe(true);
  });

  it('should call reset method with success', async () => {
    jest
      .spyOn(productRepo, 'findAllProductsOrFilteredByIds')
      .mockResolvedValueOnce([product]);

    const useCase = new ResetProductStockUseCase(productRepo);
    const result = await useCase.execute({ productsIds: [] });
    expect(result.isSuccess).toBe(true);
  });
});
