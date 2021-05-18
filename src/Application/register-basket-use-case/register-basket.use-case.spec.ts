import { BasketDomainService } from '@domain/services/basket.domain-service';
import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { Product } from '@domain/aggregates-root';
import { BasketCategory, ProductCategory, Tag } from '@domain/entities';
import { RegisterBasketUseCase } from './register-basket.use-case';
import {
  Currency,
  ExchangeFactorValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityInStockValueObject,
} from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';
import { ERROR_BASKET_INFO_MAX_LENGTH } from '@domain/value-objects/basket-info/basket-info-errors.domain';
import { ERROR_BASKET_DESCRIPTION_LENGTH } from '@domain/value-objects/basket-description/basket-description-errors.domain';

describe('register-basket.use-case', () => {
  //
  let basketCategoryRepo: BasketCategoryRepositoryInterface;
  let productRepo: ProductRepositoryInterface;
  let tagRepo: TagRepositoryInterface;
  let basketRepo: BasketRepositoryInterface;
  let domainService: BasketDomainService;
  //
  // fake product
  const product = Product.create(
    {
      exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 100,
        }).getResult(),
      ).getResult(),
      quantityAvailable: QuantityInStockValueObject.create(10).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create('KG').getResult(),
    },
    new UniqueEntityID('valid_id'),
  ).getResult();
  //
  // fake category
  const category = BasketCategory.create({
    changesLimit: 2,
    description: 'valid_description',
  }).getResult();
  //
  // fake tag
  const tag = Tag.create({
    description: 'valid_description',
  }).getResult();

  beforeEach(() => {
    basketCategoryRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
    //
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
    //
    tagRepo = {
      exists: jest.fn(),
      findTagsById: jest.fn(),
      updateOrCreate: jest.fn(),
    };
    //
    basketRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      deactivateManyBaskets: jest.fn(),
      updateAllBasketItemByProductId: jest.fn(),
    };
    //
    domainService = new BasketDomainService();
    //
  });

  it('should be defined', () => {
    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    expect(useCase).toBeDefined();
  });

  it('should fail if currency value is not a number ', async () => {
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(category);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'valid_category_id',
      description: 'valid_description',
      isActive: true,
      price: '80a' as unknown as number,
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Currency value must be a number');
  });

  it('should fail if category does not exists ', async () => {
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'invalid_category_id',
      description: 'valid_description',
      isActive: true,
      price: 50,
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Does not exist category for provided id');
  });

  it('should save with success if not provide items', async () => {
    //
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(category);
    //
    jest.spyOn(tagRepo, 'findTagsById').mockResolvedValueOnce([tag]);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'invalid_category_id',
      description: 'valid_description',
      isActive: true,
      price: 50,
      tagsIds: ['valid_id'],
    });

    expect(result.isSuccess).toBe(true);
  });

  it('should fail if provide an invalid info length', async () => {
    //
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(category);
    //
    jest.spyOn(tagRepo, 'findTagsById').mockResolvedValueOnce([tag, tag]);

    jest
      .spyOn(productRepo, 'findProductsByIds')
      .mockResolvedValueOnce([product, product, product]);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'invalid_category_id',
      description: 'valid_description',
      info: 'invalid_info_length'.repeat(30),
      isActive: true,
      price: 50,
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(ERROR_BASKET_INFO_MAX_LENGTH);
  });

  it('should fail if provide an invalid description length', async () => {
    //
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(category);
    //
    jest.spyOn(tagRepo, 'findTagsById').mockResolvedValueOnce([tag, tag]);

    jest
      .spyOn(productRepo, 'findProductsByIds')
      .mockResolvedValueOnce([product, product, product]);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'invalid_category_id',
      description: 'invalid_description'.repeat(5),
      info: 'valid_info_length',
      isActive: true,
      price: 50,
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(ERROR_BASKET_DESCRIPTION_LENGTH);
  });

  it('should save with success if provide items', async () => {
    //
    jest.spyOn(basketCategoryRepo, 'findOne').mockResolvedValueOnce(category);
    //
    jest.spyOn(tagRepo, 'findTagsById').mockResolvedValueOnce([tag, tag]);

    jest
      .spyOn(productRepo, 'findProductsByIds')
      .mockResolvedValueOnce([product, product, product]);

    const useCase = new RegisterBasketUseCase(
      basketCategoryRepo,
      productRepo,
      tagRepo,
      basketRepo,
      domainService,
    );

    const result = await useCase.execute({
      categoryId: 'invalid_category_id',
      description: 'valid_description',
      isActive: true,
      price: 50,
      tagsIds: ['valid_id', 'valid_id'],
      items: [
        { productId: 'valid_id', quantity: 3 },
        { productId: 'valid_id', quantity: 1 },
        { productId: 'valid_id', quantity: 2 },
      ],
    });

    expect(result.isSuccess).toBe(true);
  });
});
