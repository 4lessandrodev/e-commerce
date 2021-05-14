import { RegisterBasketCategoryDto } from './dto/register-basket-category.dto';
import { Controller, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BasketService } from './basket.service';
import { RegisterBasketDto } from './dto/register-basket.dto';
import { AddProductsOnBasketDto } from './dto/add-products-on-basket.dto';
import { Inject } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Body, UseGuards, UsePipes } from '@nestjs/common';

@Controller('v1/basket')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class BasketController {
  constructor(
    @Inject(BasketService) private readonly basketService: BasketService,
  ) {}

  @Post('category')
  registerBasketCategory(
    @Body() dto: RegisterBasketCategoryDto,
  ): Promise<void> {
    return this.basketService.registerBasketCategory(dto);
  }

  @Post()
  registerBasket(@Body() dto: RegisterBasketDto): Promise<void> {
    return this.basketService.registerBasket(dto);
  }

  @Put('item')
  addProductsOnBasket(@Body() dto: AddProductsOnBasketDto): Promise<void> {
    return this.basketService.addProductsOnBasket(dto);
  }
}
