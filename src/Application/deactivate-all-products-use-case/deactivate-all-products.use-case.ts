import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';

export class DeactivateAllProductsUseCase
  implements IUseCase<any, Result<void>>
{
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
  ) {}

  async execute(): Promise<Result<void>> {
    try {
      //
      await this.productRepo.deactivateAllProducts();
      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Deactivate All Products Use Case',
      );
    }
  }
}
