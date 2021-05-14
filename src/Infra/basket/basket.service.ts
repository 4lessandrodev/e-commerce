import { AddProductsOnBasketDto } from '@app/add-products-on-basket-use-case/add-products-on-basket.dto';
import { RegisterBasketCategoryDto } from '@app/register-basket-category-use-case/register-basket-category.dto';
import { RegisterBasketDto } from '@app/register-basket-use-case/register-basket.dto';

import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import { AddProductsOnBasketUseCase } from '@app/add-products-on-basket-use-case/add-products-on-basket.use-case';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';

@Injectable()
export class BasketService {
  constructor(
    @Inject(RegisterBasketCategoryUseCase)
    private readonly registerBasketCategoryUseCase: RegisterBasketCategoryUseCase,

    @Inject(RegisterBasketUseCase)
    private readonly registerBasketUseCase: RegisterBasketUseCase,

    @Inject(AddProductsOnBasketUseCase)
    private readonly addProductsOnBasketUseCase: AddProductsOnBasketUseCase,
  ) {}

  async registerBasketCategory(dto: RegisterBasketCategoryDto): Promise<void> {
    const result = await this.registerBasketCategoryUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerBasket(dto: RegisterBasketDto): Promise<void> {
    const result = await this.registerBasketUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async addProductsOnBasket(dto: AddProductsOnBasketDto): Promise<void> {
    const result = await this.addProductsOnBasketUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
