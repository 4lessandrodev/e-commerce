import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { RegisterBasketDto } from './register-basket.dto';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { Basket } from '@domain/aggregates-root';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { IUseCase, Result } from 'types-ddd';
import { Inject, Injectable } from '@nestjs/common';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { BasketDomainService } from '@domain/services/basket.service';

@Injectable()
export class RegisterBasketUseCase
  implements IUseCase<RegisterBasketDto, Result<void>>
{
  //
  constructor(
    @Inject('BasketCategoryRepository')
    private readonly basketCategoryRepo: BasketCategoryRepositoryInterface,
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
    @Inject('TagRepository')
    private readonly tagRepo: TagRepositoryInterface,
    @Inject('BasketRepository')
    private readonly basketRepo: BasketRepositoryInterface,
    @Inject(BasketDomainService)
    private readonly domainService: BasketDomainService,
  ) {}
  //
  async execute(dto: RegisterBasketDto): Promise<Result<void>> {
    //
    const currencyOrError = Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value: dto.price,
    });

    if (currencyOrError.isFailure) {
      return Result.fail<void>(currencyOrError.error.toString());
    }
    const currency = currencyOrError.getResult();

    //
    const priceOrError = MonetaryValueObject.create(currency);
    //
    if (priceOrError.isFailure) {
      return Result.fail<void>(priceOrError.error.toString());
    }

    const price = priceOrError.getResult();

    try {
      const category = await this.basketCategoryRepo.findOne({
        id: dto.categoryId,
      });

      if (!category) {
        return Result.fail<void>('Does not exist category for provided id');
      }

      const basketAlreadyExistsForDescription = await this.basketRepo.findOne({
        description: dto.description.toLowerCase(),
      });
      //
      if (basketAlreadyExistsForDescription) {
        return Result.fail<void>(
          'Basket already exists for provided description',
        );
      }

      const basketOrError = Basket.create({
        price,
        category,
        info: dto.info,
        isActive: dto.isActive,
        description: dto.description,
      });
      //-------------------------------------------------------------
      if (basketOrError.isFailure) {
        return Result.fail<void>(basketOrError.error.toString());
      }
      const basket = basketOrError.getResult();

      //-------------------------------------------------------------
      if (dto.tagsIds) {
        const foundTags = await this.tagRepo.findTagsById(dto.tagsIds);
        this.domainService.addTagsOnBasket(foundTags, basket);
      }

      //-------------------------------------------------------------
      if (dto.items) {
        const ids = dto.items.map(({ productId }) => productId);
        const foundProducts = await this.productRepo.findProductsByIds(ids);
        if (foundProducts) {
          this.domainService.addItemsOnBasket(dto.items, basket, foundProducts);
        }
      }

      /**
       * @todo: add image uploader service
       */

      await this.basketRepo.save(basket);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      console.log(error);

      return Result.fail<void>(
        'Internal Server Error on Register Basket Use Case',
      );
    }
  }
}
