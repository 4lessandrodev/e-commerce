import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { BasketDomainService } from '@domain/services/basket.service';
import { RemoveProductsFromBasketUseCase } from './remove-products-from-basket.use-case';
import { UniqueEntityID } from 'types-ddd/dist/src';
import {
  BasketItemValueObject,
  Currency,
  MonetaryValueObject,
} from '@domain/value-objects';
import { BasketCategory } from '@domain/entities';
import { Basket, ProductId } from '@domain/aggregates-root';

describe('remove-products-from-basket.use-case', () => {
  //
  let basketRepo: BasketRepositoryInterface;
  const domainService = new BasketDomainService();
  //
  // Mock items
  const itemA = BasketItemValueObject.create({
    description: 'valid_description',
    exchangeFactor: 2,
    productId: ProductId.create(new UniqueEntityID('valid_id1')),
    quantity: 10,
  }).getResult();
  //
  const itemB = BasketItemValueObject.create({
    description: 'valid_description',
    exchangeFactor: 2,
    productId: ProductId.create(new UniqueEntityID('valid_id2')),
    quantity: 10,
  }).getResult();
  //
  const price = MonetaryValueObject.create(
    Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value: 10,
    }).getResult(),
  ).getResult();
  //
  // Mock basket
  let basket: Basket;

  beforeEach(() => {
    basketRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
    //
    basket = Basket.create(
      {
        category: BasketCategory.create({
          changesLimit: 1,
          description: 'valid_description',
        }).getResult(),
        description: 'valid_description',
        isActive: true,
        price,
        items: [itemA, itemB],
      },
      new UniqueEntityID('valid_id'),
    ).getResult();
  });

  it('should be defined', () => {
    const useCase = new RemoveProductsFromBasketUseCase(
      basketRepo,
      domainService,
    );
    expect(useCase).toBeDefined();
  });

  it('should fail if basket does not exists', async () => {
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new RemoveProductsFromBasketUseCase(
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      basketId: 'valid_id',
      productIds: ['valid_id1'],
    });
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Basket does not exists');
  });

  it('should remove items with success', async () => {
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);

    const useCase = new RemoveProductsFromBasketUseCase(
      basketRepo,
      domainService,
    );

    expect(basket.products.length).toBe(2);

    const result = await useCase.execute({
      basketId: 'valid_id',
      productIds: ['valid_id1', 'valid_id2'],
    });

    expect(result.isSuccess).toBe(true);
    expect(basket.products.length).toBe(0);
  });

  it('should remove only one item with success', async () => {
    jest.spyOn(basketRepo, 'findOne').mockResolvedValueOnce(basket);

    const useCase = new RemoveProductsFromBasketUseCase(
      basketRepo,
      domainService,
    );

    expect(basket.products.length).toBe(2);

    const result = await useCase.execute({
      basketId: 'valid_id',
      productIds: ['valid_id1'],
    });

    expect(result.isSuccess).toBe(true);
    expect(basket.products.length).toBe(1);
  });
});
