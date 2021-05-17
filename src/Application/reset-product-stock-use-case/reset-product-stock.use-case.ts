import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { ResetProductStockDto } from './reset-product-stock.dto';

@Injectable()
export class ResetProductStockUseCase
  implements IUseCase<ResetProductStockDto, Result<void>>
{
  //
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
  ) {}

  async execute(dto: ResetProductStockDto): Promise<Result<void>> {
    try {
      //
      const hasIds = (dto?.productsIds?.length ?? 0) > 0;

      const ids = hasIds ? dto.productsIds : undefined;

      await this.productRepo.resetStock(ids);

      return Result.ok<void>();

      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Reset Product Stock Use Case',
      );
    }
  }
}
