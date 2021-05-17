import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { DeactivateManyBasketsDto } from './deactivate-many-baskets.dto';

@Injectable()
export class DeactivateManyBasketsUseCase
  implements IUseCase<DeactivateManyBasketsDto, Result<void>>
{
  constructor(
    @Inject('BasketRepository')
    private readonly basketRepo: BasketRepositoryInterface,
  ) {}

  async execute(dto: DeactivateManyBasketsDto): Promise<Result<void>> {
    try {
      //
      const hasIds = (dto?.basketsIds?.length ?? 0) > 0;

      const ids = hasIds ? dto.basketsIds : undefined;

      await this.basketRepo.deactivateManyBaskets(ids);

      return Result.ok<void>();

      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Deactivate Many Baskets Use Case',
      );
    }
  }
}
