import { RegisterBasketCategoryDto } from './dto/register-basket-category.dto';
import { Controller } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BasketService } from './basket.service';
import { RegisterBasketDto } from './dto/register-basket.dto';
import {
  Body,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

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
}
