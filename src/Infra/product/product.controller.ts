import { RegisterTagDto } from './dto/register-tag.dto';
import { RegisterProductDto } from './dto/register-product.dto';
import { ProductFilter } from './interfaces/product.filters.interface';
import { AuthGuard } from '@nestjs/passport';
import { RegisterProductCategoryDto } from './dto/register-product-category.dto';
import { ProductService } from './product.service';
import { Body, Inject, Param, Patch } from '@nestjs/common';
import { Get, ValidationPipe } from '@nestjs/common';
import { Post, Controller } from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { GetProductsPayload } from './interfaces/product.query.interface';
import { ProductIdDto, UpdateProductDto } from './dto/update-product.dto';
import { DeactivateManyProductsDto } from './dto/deactivate-many-products.dto';
import { ResetProductStockDto } from './dto/reset-product-stock.dto';

@Controller('v1/product')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class ProductController {
	constructor (
		@Inject(ProductService) private readonly productService: ProductService,
	) { }

	@Post()
	registerProduct (@Body() dto: RegisterProductDto): Promise<void> {
		return this.productService.registerProduct(dto);
	}

	@Post('category')
	registerProductCategory (
		@Body() dto: RegisterProductCategoryDto,
	): Promise<void> {
		return this.productService.registerProductCategory(dto);
	}

	@Post('tag')
	registerTag (@Body() dto: RegisterTagDto): Promise<void> {
		return this.productService.registerTag(dto);
	}

	@Get()
	getProducts (@Query() filter: ProductFilter): Promise<GetProductsPayload> {
		return this.productService.getProducts(filter);
	}

	@Patch('/:id')
	updateProduct (
		@Param() param: ProductIdDto,
		@Body() dto: UpdateProductDto,
	): Promise<void> {
		dto.productId = param.id;
		return this.productService.updateProduct(dto);
	}

	@Post('stock')
	resetProductStock (@Body() dto: ResetProductStockDto): Promise<void> {
		return this.productService.resetProductStock(dto);
	}

	@Patch()
	deactivateManyProducts (
		@Body() dto: DeactivateManyProductsDto,
	): Promise<void> {
		return this.productService.deactivateAllProducts(dto);
	}

	@Get('category/:id')
	getProductByCategory (
		@Param('id') id: string,
		@Query() filter: ProductFilter): Promise<GetProductsPayload> {
		return this.productService.getProductByCategoryId(id, filter);
	}

	@Get('tag/:id')
	getProductByTag (
		@Param('id') id: string,
		@Query() filter: ProductFilter): Promise<GetProductsPayload> {
		return this.productService.getProductByTagId(id, filter);
	}
}
