import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { AddProductsOnBasketDto } from './add-products-on-basket.dto';
import { BasketRepositoryInterface } from '@repo/basket-repository.interface';
import { BasketDomainService } from '@domain/services/basket.domain-service';

@Injectable()
export class AddProductsOnBasketUseCase
	implements IUseCase<AddProductsOnBasketDto, Result<void>>
{
	constructor(
		@Inject('ProductRepository')
		private readonly productRepo: ProductRepositoryInterface,

		@Inject('BasketRepository')
		private readonly basketRepo: BasketRepositoryInterface,

		@Inject(BasketDomainService)
		private readonly basketDomainService: BasketDomainService
	) {}

	//
	async execute(dto: AddProductsOnBasketDto): Promise<Result<void>> {
		try {
			//
			const basketExists = await this.basketRepo.findOne({
				id: dto.basketId
			});

			if (!basketExists) {
				return Result.fail<void>('Basket does not exists');
			}

			const productsIds = dto.items.map((item) => item.productId);

			// Check if basket already has some provided product
			const productsAlreadyOnBasket = basketExists.products.some(
				({ value }) =>
					productsIds.includes(value.productId.id.toString())
			);

			if (productsAlreadyOnBasket) {
				return Result.fail<void>(
					'Product already on basket, change quantity instead add new one'
				);
			}

			const products = await this.productRepo.findProductsByIds(
				productsIds
			);

			if (!products) {
				return Result.fail<void>('Products does not exists');
			}

			this.basketDomainService.addItemsOnBasket(
				dto.items,
				basketExists,
				products
			);

			await this.basketRepo.save(basketExists);

			return Result.ok<void>();
			//
		} catch (error) {
			//
			return Result.fail<void>(
				'Internal Server Error on Add Products on Baskets Use Case'
			);
		}
	}
}
