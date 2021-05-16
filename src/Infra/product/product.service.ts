import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductUseCase } from '@app/register-product-use-case/register-product.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterTagDto } from './dto/register-tag.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PreconditionFailedException } from '@nestjs/common';
import { ProductQuery } from './query/product.query';
import { ProductFilter } from './interfaces/product.filters.interface';
import { GetProductsResult } from './interfaces/product.query.interface';
import { Result } from 'types-ddd';

@Injectable()
export class ProductService {
  constructor(
    @Inject(RegisterProductCategoryUseCase)
    private readonly registerProductCategoryUseCase: RegisterProductCategoryUseCase,

    @Inject(RegisterTagUseCase)
    private readonly registerTagUseCase: RegisterTagUseCase,

    @Inject(RegisterProductUseCase)
    private readonly registerProductUseCase: RegisterProductUseCase,

    @Inject(ProductQuery) private readonly productQuery: ProductQuery,
  ) {}

  private checkResult(result: Result<void>): void {
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerProductCategory(
    dto: RegisterProductCategoryDto,
  ): Promise<void> {
    const result = await this.registerProductCategoryUseCase.execute(dto);
    return this.checkResult(result);
  }

  async registerTag(dto: RegisterTagDto): Promise<void> {
    const result = await this.registerTagUseCase.execute(dto);
    return this.checkResult(result);
  }

  async registerProduct(dto: RegisterProductDto): Promise<void> {
    const result = await this.registerProductUseCase.execute(dto);
    return this.checkResult(result);
  }

  // Query methods
  async getProducts(filter: ProductFilter): Promise<GetProductsResult> {
    return this.productQuery.getProducts(filter);
  }
}
