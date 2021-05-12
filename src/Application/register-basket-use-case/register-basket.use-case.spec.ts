import { BasketService } from '@domain/services/basket.service';
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
  MonetaryValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';

describe('register-basket.use-case', () => {
  //
  let basketCategoryRepo: BasketCategoryRepositoryInterface;
  let productRepo: ProductRepositoryInterface;
  let tagRepo: TagRepositoryInterface;
  let basketRepo: BasketRepositoryInterface;
  let domainService: BasketService;
  //
  // fake product
  const product = Product.create(
    {
      category: ProductCategory.create({
        description: 'valid_description',
      }).getResult(),
      description: 'valid_description',
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 100,
        }).getResult(),
      ).getResult(),
      quantityAvailable: 10,
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
    };
    //
    domainService = new BasketService();
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
        { exchangeFactor: 2, productId: 'valid_id', quantity: 3 },
        { exchangeFactor: 3, productId: 'valid_id', quantity: 1 },
        { exchangeFactor: 1, productId: 'valid_id', quantity: 2 },
      ],
    });

    expect(result.isSuccess).toBe(true);
  });
});