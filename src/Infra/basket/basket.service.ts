import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { RegisterBasketCategoryDto } from './dto/register-basket-category.dto';
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
  ) {}

  async registerBasketCategory(dto: RegisterBasketCategoryDto): Promise<void> {
    const result = await this.registerBasketCategoryUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
