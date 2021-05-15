import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { BasketDomainService } from '@domain/services/basket.service';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { RemoveProductsFromBasketDto } from './remove-products-from-basket.dto';

@Injectable()
export class RemoveProductsFromBasketUseCase
  implements IUseCase<RemoveProductsFromBasketDto, Result<void>>
{
  constructor(
    @Inject('BasketRepository')
    private readonly basketRepo: BasketRepositoryInterface,

    @Inject(BasketDomainService)
    private readonly basketDomainService: BasketDomainService,
  ) {}

  async execute(dto: RemoveProductsFromBasketDto): Promise<Result<void>> {
    try {
      //
      const basketExist = await this.basketRepo.findOne({ id: dto.basketId });

      if (!basketExist) {
        return Result.fail<void>('Basket does not exists');
      }
      //
      this.basketDomainService.removeItemsFromBasket(
        basketExist,
        dto.productIds,
      );

      await this.basketRepo.save(basketExist);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Remove Products From Basket Use Case',
      );
    }
  }
}
