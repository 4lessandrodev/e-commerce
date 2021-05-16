import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';

@Injectable()
export class DeactivateAllBasketsUseCase
  implements IUseCase<any, Result<void>>
{
  constructor(
    @Inject('BasketRepository')
    private readonly basketRepo: BasketRepositoryInterface,
  ) {}

  async execute(): Promise<Result<void>> {
    try {
      //
      await this.basketRepo.deactivateAllBaskets();

      return Result.ok<void>();

      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Deactivate All Baskets Use Case',
      );
    }
  }
}
