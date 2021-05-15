import { AddProductsOnBasketDto } from '@app/add-products-on-basket-use-case/add-products-on-basket.dto';
import { RegisterBasketCategoryDto } from '@app/register-basket-category-use-case/register-basket-category.dto';
import { RegisterBasketDto } from '@app/register-basket-use-case/register-basket.dto';
import { RemoveProductsFromBasketDto } from '@app/remove-products-from-basket-use-case/remove-products-from-basket.dto';
import { UpdateBasketDto } from '@app/update-basket-use-case/update-basket.dto';
import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import { AddProductsOnBasketUseCase } from '@app/add-products-on-basket-use-case/add-products-on-basket.use-case';
import { RemoveProductsFromBasketUseCase } from '@app/remove-products-from-basket-use-case/remove-products-from-basket.use-case';
import { UpdateBasketUseCase } from '@app/update-basket-use-case/update-basket.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { PreconditionFailedException } from '@nestjs/common';

@Injectable()
export class BasketService {
  constructor(
    @Inject(RegisterBasketCategoryUseCase)
    private readonly registerBasketCategoryUseCase: RegisterBasketCategoryUseCase,

    @Inject(RegisterBasketUseCase)
    private readonly registerBasketUseCase: RegisterBasketUseCase,

    @Inject(AddProductsOnBasketUseCase)
    private readonly addProductsOnBasketUseCase: AddProductsOnBasketUseCase,

    @Inject(RemoveProductsFromBasketUseCase)
    private readonly removeProductsFromBasketUseCase: RemoveProductsFromBasketUseCase,

    @Inject(UpdateBasketUseCase)
    private readonly updateBasketUseCase: UpdateBasketUseCase,
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

  async removeProductsFromBasket(
    dto: RemoveProductsFromBasketDto,
  ): Promise<void> {
    const result = await this.removeProductsFromBasketUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async updateBasket(dto: UpdateBasketDto): Promise<void> {
    const result = await this.updateBasketUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
