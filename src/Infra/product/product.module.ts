import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductUseCase } from '@app/register-product-use-case/register-product.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { ProductCategoryRepository } from './repo/product-category.repository';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { Product, ProductSchema } from './entities/product.schema';
import { ProductTagMapper } from './mapper/product-tag.mapper';
import { ProductRepository } from './repo/product.repository';
import { ProductController } from './product.controller';
import { ProductMapper } from './mapper/product.mapper';
import { TagRepository } from './repo/tag.repository';
import { ProductService } from './product.service';
import { TagSchema } from './entities/tag.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';
import { TagMapper } from './mapper/tag.mapper';
import { Module } from '@nestjs/common';
import { Tag } from '@domain/entities';
import {
  ProductCategory,
  ProductCategorySchema,
} from './entities/product-category.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [
    ProductCategoryMapper,
    ProductTagMapper,
    TagMapper,
    ProductMapper,
    ProductCategoryRepository,
    {
      provide: 'ProductCategoryRepository',
      useClass: ProductCategoryRepository,
    },
    {
      provide: 'TagRepository',
      useClass: TagRepository,
    },
    {
      provide: 'ProductRepository',
      useClass: ProductRepository,
    },
    {
      provide: 'TagRepository',
      useClass: TagRepository,
    },
    RegisterProductCategoryUseCase,
    RegisterProductUseCase,
    RegisterTagUseCase,
    ProductService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
