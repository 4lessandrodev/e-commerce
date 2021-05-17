import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { ProductCategoryRepositoryInterface } from '@repo/product-category-repository.interface';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { RegisterProductUseCase } from './register-product.use-case';
import { UniqueEntityID } from 'types-ddd/dist/src';
import { ProductCategory, Tag } from '@domain/entities';
import { ERROR_INVALID_EXCHANGE_FACTOR } from '@domain/value-objects/exchange-factor/exchange-factor-errors.domain';

describe('register-product.use-case', () => {
  //
  let productRepo: ProductRepositoryInterface;
  let productCategoryRepo: ProductCategoryRepositoryInterface;
  let tagRepo: TagRepositoryInterface;
  //
  const category = ProductCategory.create(
    {
      description: 'valid_description',
    },
    new UniqueEntityID('valid_id'),
  ).getResult();

  beforeEach(() => {
    productRepo = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      findProductsByIds: jest.fn(),
      deactivateManyProducts: jest.fn(),
      resetStock: jest.fn(),
    };
    productCategoryRepo = {
      exists: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    };
    tagRepo = {
      exists: jest.fn(),
      findTagsById: jest.fn(),
      updateOrCreate: jest.fn(),
    };
  });
  //
  it('should be defined', () => {
    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    expect(useCase).toBeDefined();
  });

  it('should fail if exists product with provided description', async () => {
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(true);

    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    const result = await useCase.execute({
      exchangeFactor: 2,
      categoryId: 'valid_id',
      description: 'invalid_description',
      isActive: true,
      isSpecial: false,
      price: 20,
      quantityAvailable: 10,
      unitOfMeasurement: 'UN',
      info: 'valid_info',
      tagsIds: ['valid_tag'],
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Product already exists');
  });

  it('should fail provide an invalid exchangeFactor', async () => {
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(productCategoryRepo, 'findOne').mockResolvedValueOnce(category);

    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    const result = await useCase.execute({
      exchangeFactor: -1,
      categoryId: 'valid_id',
      description: 'valid_description',
      isActive: true,
      isSpecial: false,
      price: 20,
      quantityAvailable: 10,
      unitOfMeasurement: 'UN',
      info: 'valid_info',
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(ERROR_INVALID_EXCHANGE_FACTOR);
  });

  it('should fail provide an invalid exchangeFactor', async () => {
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(productCategoryRepo, 'findOne').mockResolvedValueOnce(category);

    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    const result = await useCase.execute({
      exchangeFactor: 8,
      categoryId: 'valid_id',
      description: 'valid_description',
      isActive: true,
      isSpecial: false,
      price: 20,
      quantityAvailable: 10,
      unitOfMeasurement: 'UN',
      info: 'valid_info',
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe(ERROR_INVALID_EXCHANGE_FACTOR);
  });

  it('should fail if category does not exists', async () => {
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(productCategoryRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    const result = await useCase.execute({
      exchangeFactor: 2,
      categoryId: 'invalid_id',
      description: 'valid_description',
      isActive: true,
      isSpecial: false,
      price: 20,
      quantityAvailable: 10,
      unitOfMeasurement: 'UN',
      info: 'valid_info',
      tagsIds: ['valid_tag'],
    });

    expect(result.isFailure).toBe(true);
    expect(result.error).toBe('Category does not exists');
  });

  it('should add tags to the product', async () => {
    jest.spyOn(productRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(tagRepo, 'findTagsById').mockResolvedValueOnce([
      Tag.create({
        description: 'valid_description',
      }).getResult(),
    ]);
    jest.spyOn(productCategoryRepo, 'findOne').mockResolvedValueOnce(category);

    const useCase = new RegisterProductUseCase(
      productRepo,
      productCategoryRepo,
      tagRepo,
    );
    const result = await useCase.execute({
      exchangeFactor: 2,
      categoryId: 'valid_id',
      description: 'valid_description',
      isActive: true,
      isSpecial: false,
      price: 20,
      quantityAvailable: 10,
      unitOfMeasurement: 'UN',
      info: 'valid_info',
      tagsIds: ['valid_tag'],
    });

    expect(result.isSuccess).toBe(true);
  });
});
