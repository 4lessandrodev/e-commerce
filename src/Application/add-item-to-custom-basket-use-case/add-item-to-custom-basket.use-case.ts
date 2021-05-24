import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result, UniqueEntityID } from 'types-ddd';
import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { AddItemToCustomBasketDto } from './add-item-to-custom-basket-use-case.dto';
import { OpenOrderUseCase } from '../open-order-use-case/open-order.use-case';
import { BasketId, Order, ProductId } from '@domain/aggregates-root';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { CustomBasketDomainService } from '@domain/services/custom-basket.domain-service';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { CustomBasket } from '@domain/entities';
import { BasketItemValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';

@Injectable()
export class AddItemToCustomBasketUseCase
  implements IUseCase<AddItemToCustomBasketDto, Result<void>>
{
  constructor(
    @Inject('OrderRepository')
    private readonly orderRepo: OrderRepositoryInterface,

    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,

    @Inject('BasketRepository')
    private readonly basketRepo: BasketRepositoryInterface,

    @Inject(CustomBasketDomainService)
    private readonly customBasketDomainService: CustomBasketDomainService,

    @Inject(OpenOrderUseCase)
    private readonly openOrderUseCase: OpenOrderUseCase,
  ) {}

  async execute(dto: AddItemToCustomBasketDto): Promise<Result<void>> {
    try {
      //
      let order: Order | null;
      let customBasket: CustomBasket | undefined;
      const quantityToAddOrError = QuantityAvailableValueObject.create(
        dto.quantityOfItemToAdd,
      );

      // Check if is valid quantity
      if (quantityToAddOrError.isFailure) {
        return Result.fail<void>(quantityToAddOrError.error.toString());
      }

      const quantityToAdd = quantityToAddOrError.getResult();

      // Check if client has an opened order
      order = await this.orderRepo.getClientOpenedOrder({
        clientId: dto.clientId,
        status: 'PENDING',
      });

      if (!order) {
        // Open a new order
        const result = await this.openOrderUseCase.execute({
          userId: dto.clientId,
        });

        if (result.isFailure) {
          return Result.fail<void>(String(result.error));
        }

        order = await this.orderRepo.getClientOpenedOrder({
          clientId: dto.clientId,
          status: 'PENDING',
        });
      }

      if (!order) {
        return Result.fail<void>('Could not open order to client');
      }

      const productExists = await this.productRepo.findOne({
        id: dto.productId,
      });

      if (!productExists) {
        return Result.fail<void>('Product does not exists');
      }

      const product = productExists;

      // Custom basket on order (draft and basket id match)
      customBasket = order.customBaskets.find(
        (basket) =>
          basket.isDraft &&
          basket.basketId.id.equals(new UniqueEntityID(dto.basketId)),
      );

      // Create a new custom basket if it does not exists
      if (!customBasket) {
        const basket = await this.basketRepo.findOne({ id: dto.basketId });
        if (!basket) {
          return Result.fail<void>('Basket does not exists');
        }

        if (!basket.isActive) {
          return Result.fail<void>('Basket is not active');
        }

        // Ensure create a custom basket
        customBasket = CustomBasket.create({
          basketId: BasketId.create(basket.id),
          category: basket.category,
          currentItems: basket.products,
          description: basket.description,
          isDraft: true,
          itemsAdded: [],
          itemsRemoved: [],
          price: basket.price,
          quantity: QuantityAvailableValueObject.create(1).getResult(),
          image: basket.images[0],
        }).getResult();
      }

      // Create item to add on custom basket
      const item = BasketItemValueObject.create({
        availableStock: product.quantityAvailable,
        description: product.description,
        exchangeFactor: product.exchangeFactor,
        image: product.image,
        productId: ProductId.create(product.id),
        quantity: product.quantityAvailable,
        unitOfMeasurement: product.unitOfMeasurement,
      }).getResult();

      // Add item to custom basket
      this.customBasketDomainService.addItemToCustomBasket({
        customBasket,
        item,
        quantityToAdd,
      });

      await this.orderRepo.save(order);

      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(
        'Internal Server Error on Add Item to Custom Basket Use Case',
      );
    }
  }
}
