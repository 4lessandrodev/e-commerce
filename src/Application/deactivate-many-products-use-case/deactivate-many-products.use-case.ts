import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { DeactivateManyProductsDto } from './deactivate-many-products.dto';

export class DeactivateManyProductsUseCase
  implements IUseCase<DeactivateManyProductsDto, Result<void>>
{
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
  ) {}

  async execute(dto: DeactivateManyProductsDto): Promise<Result<void>> {
    try {
      //

      const hasIds = (dto?.productsIds?.length ?? 0) > 0;

      const ids = hasIds ? dto.productsIds : undefined;

      await this.productRepo.deactivateManyProducts(ids);
      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Deactivate Many Products Use Case',
      );
    }
  }
}
