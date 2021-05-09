import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketCategoryRepositoryInterface } from '@repo/basket-category-repository.interface';
import { RegisterBasketCategoryDto } from './register-basket-category.dto';
import { BasketCategory } from '@domain/entities';

@Injectable()
export class RegisterBasketCategoryUseCase
  implements IUseCase<RegisterBasketCategoryDto, Result<void>> {
  //
  constructor(
    @Inject('BasketCategoryRepo')
    private readonly basketCategoryRepo: BasketCategoryRepositoryInterface,
  ) {}

  async execute(dto: RegisterBasketCategoryDto): Promise<Result<void>> {
    //
    const categoryOrError = BasketCategory.create({
      changesLimit: dto.changesLimit,
      description: dto.description,
    });

    if (categoryOrError.isFailure) {
      return Result.fail<void>(categoryOrError.error.toString());
    }

    const category = categoryOrError.getResult();

    try {
      const alreadyExistCategoryWithDescription = await this.basketCategoryRepo.exists(
        { description: dto.description },
      );

      if (alreadyExistCategoryWithDescription) {
        return Result.fail<void>(
          'Already exists category with provided description',
        );
      }

      await this.basketCategoryRepo.save(category);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Register Basket Category Use Case',
      );
    }
  }
}
