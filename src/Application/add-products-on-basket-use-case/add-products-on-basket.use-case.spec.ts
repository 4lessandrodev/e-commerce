import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { BasketDomainService } from '@domain/services/basket.service';
import { AddProductsOnBasketUseCase } from './add-products-on-basket.use-case';
import { Basket, Product } from '@domain/aggregates-root';
import { BasketCategory, ProductCategory } from '@domain/entities';
import {
  Currency,
  MonetaryValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { UniqueEntityID } from 'types-ddd/dist/src';

describe('add-products-on-basket.use-case', () => {
  //
  const price = MonetaryValueObject.create(
    Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value: 10,
    }).getResult(),
  ).getResult();
  //
  let basketRepo: BasketRepositoryInterface;
  let productRepo: ProductRepositoryInterface;
  const domainService = new BasketDomainService();

  // Mock basket
  const basket = Basket.create(
    {
      category: BasketCategory.create({
        changesLimit: 1,
        description: 'valid_description',
      }).getResult(),
      description: 'valid_description',
      isActive: true,
      price,
    },
    new UniqueEntityID('valid_id'),
  ).getResult();

  // Mock product
  const product = Product.create(
    {
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      description: 'valid_description',
      exchangeFactor: 1,
      isActive: true,
      isSpecial: false,
      price,
      quantityAvailable: 20,
      unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
    },
    new UniqueEntityID('valid_id'),
  ).getResult();
  //
  beforeEach(() => {
    basketRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
    productRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      findProductsByIds: jest.fn(),
    };
  });
  //
  it('should be defined', () => {
    const useCase = new AddProductsOnBasketUseCase(
      productRepo,
      basketRepo,
      domainService,
    );
    expect(useCase).toBeDefined();
  });

  it('should fail if basket does not exists', async () => {
    // Mock repo
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new AddProductsOnBasketUseCase(
      productRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      basketId: 'invalid_basket_id',
      items: [],
    });
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Basket does not exists');
  });

  it('should fail if products does not exists', async () => {
    // Mock repo
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
    jest.spyOn(productRepo, 'findProductsByIds').mockResolvedValueOnce(null);

    const useCase = new AddProductsOnBasketUseCase(
      productRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      basketId: 'valid_id',
      items: [{ productId: 'invalid_id', quantity: 1 }],
    });
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Products does not exists');
  });

  it('should save with success', async () => {
    // Mock repo
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
    // Mock product
    jest
      .spyOn(productRepo, 'findProductsByIds')
      .mockResolvedValueOnce([product]);

    const useCase = new AddProductsOnBasketUseCase(
      productRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      basketId: 'valid_id',
      items: [{ productId: 'valid_id', quantity: 1 }],
    });
    expect(result.isSuccess).toBe(true);
  });

  it('should fail if product already on basket', async () => {
    // Mock repo
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);
    // Mock product
    jest
      .spyOn(productRepo, 'findProductsByIds')
      .mockResolvedValueOnce([product]);

    const useCase = new AddProductsOnBasketUseCase(
      productRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      basketId: 'valid_id',
      items: [{ productId: 'valid_id', quantity: 1 }],
    });
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(
      'Product already on basket, change quantity instead add new one',
    );
  });
});
