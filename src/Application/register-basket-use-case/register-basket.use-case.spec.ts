import { BasketService } from '@domain/services/basket.service';
import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { RegisterBasketUseCase } from './register-basket.use-case';

describe('register-basket.use-case', () => {
  //
  let basketCategoryRepo: BasketCategoryRepositoryInterface;
  let productRepo: ProductRepositoryInterface;
  let tagRepo: TagRepositoryInterface;
  let basketRepo: BasketRepositoryInterface;
  let domainService: BasketService;

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
});
