import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { UpdateBasketItemsDto } from './update-basket-items.dto';

export class UpdateBasketItemUseCase
  implements IUseCase<UpdateBasketItemsDto, Result<void>>
{
  //
  constructor(
    @Inject('BasketRepository')
    private readonly basketRepository: BasketRepositoryInterface,
  ) {}

  async execute(dto: UpdateBasketItemsDto): Promise<Result<void>> {
    try {
      //
      await this.basketRepository.updateAllBasketItemByProductId(dto);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Update Basket Item Use Case',
      );
    }
  }
}
