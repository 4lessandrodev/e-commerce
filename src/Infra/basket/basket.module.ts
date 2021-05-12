import { RegisterBasketCategoryUseCase } from '@app/register-basket-category-use-case/register-basket-category.use-case';
import { BasketCategoryRepository } from '@infra/basket/repo/basket-category.repository';
import { BasketController } from './basket.controller';
import { Product, ProductSchema } from '@infra/product/entities/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@infra/user/user.module';
import { BasketService } from './basket.service';
import { TagMapper } from '@infra/product/mapper/tag.mapper';
import { BasketMapper } from './mappers/basket.mapper';
import { BasketItemMapper } from './mappers/basket-item.mapper';
import { Module } from '@nestjs/common';
import { Tag, TagSchema } from '@infra/product/entities/tag.schema';
import { BasketRepository } from './repo/basket.repository';
import { TagRepository } from '@infra/product/repo/tag.repository';
import { BasketCategoryMapper } from './mappers/basket-category.mapper';
import { CategoryMapper } from '@infra/product/mapper/category.mapper';
import { ProductRepository } from '@infra/product/repo/product.repository';
import { Basket, BasketSchema } from './entities/basket.schema';
import { RegisterBasketUseCase } from '@app/register-basket-use-case/register-basket.use-case';
import {
  BasketCategory,
  BasketCategorySchema,
} from './entities/basket-category.schema';
import { ProductMapper } from '../product/mapper/product.mapper';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: BasketCategory.name, schema: BasketCategorySchema },
      { name: Basket.name, schema: BasketSchema },
      { name: Tag.name, schema: TagSchema },
      { name: Product.name, schema: ProductSchema },
    ]),
  ],
  providers: [
    CategoryMapper,
    BasketCategoryMapper,
    BasketItemMapper,
    TagMapper,
    ProductMapper,
    BasketMapper,
    BasketCategoryRepository,
    ProductRepository,
    TagRepository,
    BasketRepository,
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
    RegisterBasketUseCase,
    BasketService,
  ],
  controllers: [BasketController],
})
export class BasketModule {}
