import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductUseCase } from '@app/register-product-use-case/register-product.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { UpdateProductUseCase } from '@app/update-product-use-case/update-product.use-case';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { UpdateProductDto } from '@app/update-product-use-case/update-product.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { RegisterTagDto } from './dto/register-tag.dto';
import {
	Inject,
	Injectable,
	PreconditionFailedException
} from '@nestjs/common';

import { ProductQuery } from './query/product.query';
import { ProductFilter } from './interfaces/product.filters.interface';
import { GetProductsPayload } from './interfaces/product.query.interface';
import { DeactivateManyProductsUseCase } from '@app/deactivate-many-products-use-case/deactivate-many-products.use-case';
import { DeactivateManyProductsDto } from '@app/deactivate-many-products-use-case/deactivate-many-products.dto';
import { ResetProductStockUseCase } from '@app/reset-product-stock-use-case/reset-product-stock.use-case';
import { ResetProductStockDto } from '@app/reset-product-stock-use-case/reset-product-stock.dto';
import { Result } from 'types-ddd';

@Injectable()
export class ProductService {
	constructor(
		@Inject(RegisterProductCategoryUseCase)
		private readonly registerProductCategoryUseCase: RegisterProductCategoryUseCase,

		@Inject(RegisterTagUseCase)
		private readonly registerTagUseCase: RegisterTagUseCase,

		@Inject(RegisterProductUseCase)
		private readonly registerProductUseCase: RegisterProductUseCase,

		@Inject(UpdateProductUseCase)
		private readonly updateProductUseCase: UpdateProductUseCase,

		@Inject(DeactivateManyProductsUseCase)
		private readonly deactivateManyProductsUseCase: DeactivateManyProductsUseCase,

		@Inject(ResetProductStockUseCase)
		private readonly resetProductStockUseCase: ResetProductStockUseCase,

		@Inject(ProductQuery) private readonly productQuery: ProductQuery
	) {}

	private checkResult(result: Result<void>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async registerProductCategory(
		dto: RegisterProductCategoryDto
	): Promise<void> {
		const result = await this.registerProductCategoryUseCase.execute(dto);
		this.checkResult(result);
	}

	async registerTag(dto: RegisterTagDto): Promise<void> {
		const result = await this.registerTagUseCase.execute(dto);
		this.checkResult(result);
	}

	async registerProduct(dto: RegisterProductDto): Promise<void> {
		const result = await this.registerProductUseCase.execute(dto);
		this.checkResult(result);
	}

	async updateProduct(dto: UpdateProductDto): Promise<void> {
		const result = await this.updateProductUseCase.execute(dto);
		this.checkResult(result);
	}

	async deactivateAllProducts(dto: DeactivateManyProductsDto): Promise<void> {
		const result = await this.deactivateManyProductsUseCase.execute(dto);
		this.checkResult(result);
	}

	async resetProductStock(dto: ResetProductStockDto): Promise<void> {
		const result = await this.resetProductStockUseCase.execute(dto);
		this.checkResult(result);
	}

	// Query methods
	async getProducts(filter: ProductFilter): Promise<GetProductsPayload> {
		return await this.productQuery.getProducts(filter);
	}

	getProductByCategoryId(
		categoryId: string,
		filter: ProductFilter
	): Promise<GetProductsPayload> {
		return this.productQuery.getProductsByCategoryId(categoryId, filter);
	}

	getProductByTagId(
		tagId: string,
		filter: ProductFilter
	): Promise<GetProductsPayload> {
		return this.productQuery.getProductsByTagId(tagId, filter);
	}
}
