import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { RegisterBasketCategoryDto } from './dto/register-basket-category.dto';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import { RegisterBasketDto } from '@app/register-basket-use-case/register-basket.dto';
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
}
