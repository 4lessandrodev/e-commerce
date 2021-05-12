import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { BasketCategoryRepository } from '@infra/basket/repo/basket-category.repository';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@infra/user/user.module';
import { BasketService } from './basket.service';
import { BasketMapper } from './mappers/basket.mapper';
import { BasketItemMapper } from './mappers/basket-item.mapper';
import { Module } from '@nestjs/common';
import { BasketRepository } from './repo/basket.repository';
import { BasketCategoryMapper } from './mappers/basket-category.mapper';
import { CategoryMapper } from '@infra/product/mapper/category.mapper';
import { Basket, BasketSchema } from './entities/basket.schema';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import {
  BasketCategory,
  BasketCategorySchema,
} from './entities/basket-category.schema';
import { ProductModule } from '../product/product.module';
import { BasketDomainService } from '@domain/services/basket.service';

@Module({
  imports: [
    UserModule,
    ProductModule,
    MongooseModule.forFeature([
      { name: BasketCategory.name, schema: BasketCategorySchema },
      { name: Basket.name, schema: BasketSchema },
    ]),
  ],
  providers: [
    CategoryMapper,
    BasketCategoryMapper,
    BasketItemMapper,
    BasketMapper,
    {
      provide: 'BasketCategoryRepository',
      useClass: BasketCategoryRepository,
    },
    {
      provide: 'BasketRepository',
      useClass: BasketRepository,
    },
    RegisterBasketCategoryUseCase,
    RegisterBasketUseCase,
    BasketDomainService,
    BasketService,
  ],
  controllers: [BasketController],
})
export class BasketModule {}
