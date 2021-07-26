import { RegisterTagDto } from './dto/register-tag.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { ProductFilter } from './interfaces/product.filters.interface';
import { AuthGuard } from '@nestjs/passport';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { ProductService } from './product.service';
import {
	Body,
	Inject,
	Param,
	Patch,
	Get,
	ValidationPipe,
	Post,
	Controller,
	Query,
	UseGuards,
	UsePipes
} from '@nestjs/common';

import { GetProductsPayload } from './interfaces/product.query.interface';
import { ProductIdDto, UpdateProductDto } from './dto/update-product.dto';
import { DeactivateManyProductsDto } from './dto/deactivate-many-products.dto';
import { ResetProductStockDto } from './dto/reset-product-stock.dto';

@Controller('v1/product')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class ProductController {
	constructor(
		@Inject(ProductService) private readonly productService: ProductService
	) {}

	@Post()
	registerProduct(@Body() dto: RegisterProductDto): Promise<void> {
		return this.productService.registerProduct(dto);
	}

	@Post('category')
	async registerProductCategory(
		@Body() dto: RegisterProductCategoryDto
	): Promise<void> {
		return await this.productService.registerProductCategory(dto);
	}

	@Post('tag')
	async registerTag(@Body() dto: RegisterTagDto): Promise<void> {
		return await this.productService.registerTag(dto);
	}

	@Get()
	async getProducts(
		@Query() filter: ProductFilter
	): Promise<GetProductsPayload> {
		return await this.productService.getProducts(filter);
	}

	@Patch('/:id')
	async updateProduct(
		@Param() param: ProductIdDto,
		@Body() dto: UpdateProductDto
	): Promise<void> {
		dto.productId = param.id;
		return await this.productService.updateProduct(dto);
	}

	@Post('stock')
	async resetProductStock(@Body() dto: ResetProductStockDto): Promise<void> {
		return await this.productService.resetProductStock(dto);
	}

	@Patch()
	async deactivateManyProducts(
		@Body() dto: DeactivateManyProductsDto
	): Promise<void> {
		return await this.productService.deactivateAllProducts(dto);
	}

	@Get('category/:id')
	async getProductByCategory(
		@Param('id') id: string,
		@Query() filter: ProductFilter
	): Promise<GetProductsPayload> {
		return await this.productService.getProductByCategoryId(id, filter);
	}

	@Get('tag/:id')
	async getProductByTag(
		@Param('id') id: string,
		@Query() filter: ProductFilter
	): Promise<GetProductsPayload> {
		return await this.productService.getProductByTagId(id, filter);
	}
}
