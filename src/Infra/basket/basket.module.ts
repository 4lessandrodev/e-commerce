import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { BasketCategoryRepository } from './repo/basket-category.repository';
import { BasketController } from './basket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { BasketService } from './basket.service';
import { Module } from '@nestjs/common';
import { BasketRepository } from './repo/basket.repository';
import { TagRepository } from '../product/repo/tag.repository';
import { BasketCategoryMapper } from './mappers/basket-category.mapper';
import { CategoryMapper } from '../product/mapper/category.mapper';
import { ProductRepository } from '../product/repo/product.repository';
import {
  BasketCategory,
  BasketCategorySchema,
} from './entities/basket-category.schema';

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
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'TagRepository',
      useClass: TagRepository,
    },
    {
      provide: 'BasketRepository',
      useClass: BasketRepository,
    },

    RegisterBasketCategoryUseCase,
    BasketService,
  ],
  controllers: [BasketController],
})
export class BasketModule {}
