import { Inject, Injectable } from '@nestjs/common';
import { DomainId, IUseCase, Result } from 'types-ddd';
import { OrderRepositoryInterface } from '@repo/order-repository.interface';
import { AddItemToCustomBasketDto } from './add-item-to-custom-basket-use-case.dto';
import { OpenOrderUseCase } from '../open-order-use-case/open-order.use-case';
import {
	BasketId,
	Order,
	ProductId,
	CustomBasket
} from '@domain/aggregates-root';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';

import {
	BasketItemValueObject,
	QuantityAvailableValueObject
} from '@domain/value-objects';

import { CustomBasketRepositoryInterface } from '@repo/custom-basket-repository.interface';
import { OrderDomainService } from '@domain/services/order.domain-service';
import { OrderDomainServiceInterface } from '@domain/services/interfaces/order.domain-service.interface';

@Injectable()
export class AddItemToCustomBasketUseCase
implements IUseCase<AddItemToCustomBasketDto, Result<void>>
{
	constructor (
		@Inject('OrderRepository')
		private readonly orderRepo: OrderRepositoryInterface,

		@Inject('ProductRepository')
		private readonly productRepo: ProductRepositoryInterface,

		@Inject('BasketRepository')
		private readonly basketRepo: BasketRepositoryInterface,

		@Inject(OrderDomainService)
		private readonly orderDomainService: OrderDomainServiceInterface,

		@Inject(OpenOrderUseCase)
		private readonly openOrderUseCase: OpenOrderUseCase,

		@Inject('CustomBasketRepository')
		private readonly customBasketRepo: CustomBasketRepositoryInterface
	) {}

	/**
	 *
	 * @param dto @link AddItemToCustomBasketDto
	 * @returns Result
	 *
	 * @description
	 * This use case is quite complex.
	 * It refer to application core. Basket Customization .
	 *
	 * @method getClientOpenedOrder check if client has an opened order, if not it opens a new one
	 * @method findOne check if product to add on basket exists, if not it return result of fail
	 * @method find check if custom basket already exists on draft, if not it create a new one
	 * @method findOne on create a new custom basket check if basket is active if not return result of fail
	 * @method addItemToCustomBasket calls domain service to add item on custom basket, fails if can't add item to basket
	 * @method save finally calls save order
	 */
	async execute (dto: AddItemToCustomBasketDto): Promise<Result<void>> {
		try {
			//
			let order: Order | null; // global order
			let customBasket: CustomBasket | undefined | null; // global custom basket
			const quantityToAddOrError = QuantityAvailableValueObject.create(
				dto.quantityOfItemToAdd // global quantity of item to add on custom basket
			);

			// Check if is valid quantity
			if (quantityToAddOrError.isFailure) {
				return Result.fail<void>(quantityToAddOrError.error.toString());
			}

			const quantityToAdd = quantityToAddOrError.getResult();

			// Check if client has an opened order
			order = await this.orderRepo.getClientOpenedOrder({
				clientId: dto.clientId,
				status: 'PENDING' // Pending is the initial status
			});

			if (!order) {
				// Open a new order
				const newOrder = await this.openOrderUseCase.execute({
					userId: dto.clientId
				});

				if (newOrder.isFailure) {
					return Result.fail<void>(String(newOrder.error));
				}

				// get created order
				order = await this.orderRepo.getClientOpenedOrder({
					clientId: dto.clientId,
					status: 'PENDING' // Pending is the initial status
				});
			}

			if (!order) {
				return Result.fail<void>('Could not open order to client');
			}

			const productExists = await this.productRepo.findOne({
				id: dto.productId
			});

			if (!productExists) {
				return Result.fail<void>('Product does not exists');
			}

			const product = productExists;

			// Custom basket on order
			const customBasketId = DomainId.create(dto.customBasketId);

			const existCustomBasketOnOrder = order.customBaskets.find(
				(basket) => basket.id.equals(customBasketId.id)
			);

			if (!existCustomBasketOnOrder) {
				customBasket =
					await this.customBasketRepo.getCustomBasketFromOrder({
						orderId: order.id.toString(),
						basketId: dto.basketId
					});
			}
			// Create a new custom basket if it does not exists
			if (!customBasket) {
				const basket = await this.basketRepo.findOne({
					id: dto.basketId
				});
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
					quantity:
						QuantityAvailableValueObject.create(1).getResult(),
					image: basket.images[0]
				}).getResult();

				order.subTotalCustomBaskets.currency.sum(basket.price.value);
			}

			// Create item to add on custom basket
			const item = BasketItemValueObject.create({
				availableStock: product.quantityAvailable,
				description: product.description,
				exchangeFactor: product.exchangeFactor,
				image: product.image,
				productId: ProductId.create(product.id),
				quantity: product.quantityAvailable,
				unitOfMeasurement: product.unitOfMeasurement
			}).getResult();

			// Add item to custom basket
			const itemAddedOrError =
				this.orderDomainService.addItemToCustomBasket({
					customBasket,
					item,
					quantityToAdd,
					order
				});

			if (itemAddedOrError.isFailure) {
				return itemAddedOrError;
			}

			await this.orderRepo.save(order);
			await this.customBasketRepo.save(customBasket);

			return Result.ok<void>();
			//
		} catch (error) {
			//

			console.log(error);

			return Result.fail<void>(
				'Internal Server Error on Add Item to Custom Basket Use Case'
			);
		}
	}
}
