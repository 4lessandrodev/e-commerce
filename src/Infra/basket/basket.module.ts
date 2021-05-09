import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { BasketCategoryRepository } from './repo/basket-category.repository';
import { CategoryMapper } from '../product/mapper/category.mapper';
import { BasketController } from './basket.controller';
import { UserModule } from '../user/user.module';
import { BasketService } from './basket.service';
import {
  BasketCategory,
  BasketCategorySchema,
} from './entities/basket-category.schema';
import { BasketCategoryMapper } from './mappers/basket-category.mapper';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: BasketCategory.name, schema: BasketCategorySchema },
    ]),
  ],
  providers: [
    CategoryMapper,
    BasketCategoryMapper,
    BasketCategoryRepository,
    {
      provide: 'BasketCategoryRepository',
      useClass: BasketCategoryRepository,
    },
    RegisterBasketCategoryUseCase,
    BasketService,
  ],
  controllers: [BasketController],
})
export class BasketModule {}
