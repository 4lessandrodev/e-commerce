import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(RegisterProductCategoryUseCase)
    private readonly registerProductUseCase: RegisterProductCategoryUseCase,
  ) {}

  async registerProductCategory(
    dto: RegisterProductCategoryDto,
  ): Promise<void> {
    const result = await this.registerProductUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
