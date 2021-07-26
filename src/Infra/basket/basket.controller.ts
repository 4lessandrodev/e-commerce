import { RegisterBasketCategoryDto } from './dto/register-basket-category.dto';
import {
	Controller,
	Delete,
	Patch,
	Put,
	Inject,
	Post,
	ValidationPipe,
	Body,
	UseGuards,
	UsePipes,
	Param
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BasketService } from './basket.service';
import { RegisterBasketDto } from './dto/register-basket.dto';
import { AddProductsOnBasketDto } from './dto/add-products-on-basket.dto';

import { RemoveProductsFromBasketDto } from './dto/remove-products-from-basket.dto';

import { BasketId, UpdateBasketDto } from './dto/update-basket.dto';
import { DeactivateManyBasketsDto } from './dto/deactivate-many-baskets.dto';

@Controller('v1/basket')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class BasketController {
	constructor(
		@Inject(BasketService) private readonly basketService: BasketService
	) {}

	@Post('category')
	registerBasketCategory(
		@Body() dto: RegisterBasketCategoryDto
	): Promise<void> {
		return this.basketService.registerBasketCategory(dto);
	}

	@Post()
	async registerBasket(@Body() dto: RegisterBasketDto): Promise<void> {
		return await this.basketService.registerBasket(dto);
	}

	@Put('item')
	async addProductsOnBasket(
		@Body() dto: AddProductsOnBasketDto
	): Promise<void> {
		return await this.basketService.addProductsOnBasket(dto);
	}

	@Delete('item')
	async removeProductsFromBasket(
		@Body() dto: RemoveProductsFromBasketDto
	): Promise<void> {
		return await this.basketService.removeProductsFromBasket(dto);
	}

	@Patch('/:id')
	async updateBasket(
		@Param() param: BasketId,
		@Body() dto: UpdateBasketDto
	): Promise<void> {
		dto.basketId = param.id;
		return await this.basketService.updateBasket(dto);
	}

	@Patch()
	async deactivateAllBaskets(
		@Body() dto: DeactivateManyBasketsDto
	): Promise<void> {
		return await this.basketService.deactivateAllBaskets(dto);
	}
}
