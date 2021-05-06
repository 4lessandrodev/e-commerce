import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { RegisterTagDto } from './dto/register-tag.dto';
import { RegisterTagUseCase } from '../../Application/register-tag-use-case/register-tag.use-case';

@Injectable()
export class ProductService {
  constructor(
    @Inject(RegisterProductCategoryUseCase)
    private readonly registerProductUseCase: RegisterProductCategoryUseCase,
    @Inject(RegisterTagUseCase)
    private readonly registerTagUseCase: RegisterTagUseCase,
  ) {}

  async registerProductCategory(
    dto: RegisterProductCategoryDto,
  ): Promise<void> {
    const result = await this.registerProductUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerTag(dto: RegisterTagDto): Promise<void> {
    const result = await this.registerTagUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
