import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result, UniqueEntityID } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { ResetProductStockDto } from './reset-product-stock.dto';
import { Product } from '@domain/aggregates-root';

@Injectable()
export class ResetProductStockUseCase
	implements IUseCase<ResetProductStockDto, Result<void>>
{
	//
	constructor(
		@Inject('ProductRepository')
		private readonly productRepo: ProductRepositoryInterface
	) {}

	async execute(dto: ResetProductStockDto): Promise<Result<void>> {
		try {
			//
			const hasIds = (dto?.productsIds?.length ?? 0) > 0;

			const ids = hasIds ? dto.productsIds : undefined;

			const productsExists =
				await this.productRepo.findAllProductsOrFilteredByIds(ids);

			if (!productsExists) {
				return Result.fail<void>('Products does not exists');
			}

			const FirstProduct = productsExists[0];

			// Add domain event on first aggregate.
			// It is not necessary to put event on all products
			// This is only to have an aggregate to dispatch domain event
			const product = Product.create(
				{
					category: FirstProduct.category,
					description: FirstProduct.description,
					exchangeFactor: FirstProduct.exchangeFactor,
					isActive: FirstProduct.isActive,
					isSpecial: FirstProduct.isSpecial,
					price: FirstProduct.price,
					quantityAvailable: FirstProduct.quantityAvailable,
					unitOfMeasurement: FirstProduct.unitOfMeasurement
				},
				// Do not change this id
				new UniqueEntityID('PRODUCT_ONLY_FOR_DOMAIN_EVENT')
			).getResult();

			product.resetStockQuantityForProducts(ids);

			await this.productRepo.resetStock(ids);

			return Result.ok<void>();

			//
		} catch (error) {
			//
			return Result.fail<void>(
				'Internal Server Error on Reset Product Stock Use Case'
			);
		}
	}
}
