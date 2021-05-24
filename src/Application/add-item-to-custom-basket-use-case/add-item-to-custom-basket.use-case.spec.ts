import { CustomBasketDomainService } from '@domain/services/custom-basket.domain-service';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { OpenOrderUseCase } from '../open-order-use-case/open-order.use-case';
import { AddItemToCustomBasketUseCase } from './add-item-to-custom-basket.use-case';

describe('add-item-to-custom-basket-item', () => {
  //
  let orderRepo: OrderRepositoryInterface;

  let productRepo: ProductRepositoryInterface;

  let basketRepo: BasketRepositoryInterface;

  const customBasketDomainService: CustomBasketDomainService =
    new CustomBasketDomainService();

  let openOrderUseCase: OpenOrderUseCase;

  it('should be defined', () => {
    const useCase = new AddItemToCustomBasketUseCase(
      orderRepo,
      productRepo,
      basketRepo,
      customBasketDomainService,
      openOrderUseCase,
    );
    expect(useCase).toBeDefined();
  });
});
