import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterProductUseCase } from '@app/register-product-use-case/register-product.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { Tag } from '@domain/entities';
import { ProductQuery } from './query/product.query';
import { EmbedProductCategoryMapper } from './mapper/embed-category.mapper';
import { ProductMapper } from './mapper/product.mapper';
import { ProductService } from './product.service';
import { TagSchema } from './entities/tag.schema';
import { ProductRepository } from './repo/product.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductTagMapper } from './mapper/product-tag.mapper';
import { Product, ProductSchema } from './entities/product.schema';
import { TagRepository } from './repo/tag.repository';
import { UserModule } from '../user/user.module';
import { TagMapper } from './mapper/tag.mapper';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductCategoryRepository } from './repo/product-category.repository';
import { ProductCategory } from './entities/product-category.schema';
import { ProductCategorySchema } from './entities/product-category.schema';
import { UpdateProductUseCase } from '@app/update-product-use-case/update-product.use-case';
import { DeactivateManyProductsUseCase } from '@app/deactivate-many-products-use-case/deactivate-many-products.use-case';
import { ResetProductStockUseCase } from '@app/reset-product-stock-use-case/reset-product-stock.use-case';

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
    EmbedProductCategoryMapper,
    ProductMapper,
    ProductQuery,
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
    RegisterProductCategoryUseCase,
    RegisterProductUseCase,
    RegisterTagUseCase,
    UpdateProductUseCase,
    DeactivateManyProductsUseCase,
    ResetProductStockUseCase,
    ProductService,
  ],
  controllers: [ProductController],
  exports: [
    'ProductCategoryRepository',
    'TagRepository',
    'ProductRepository',
    ProductCategoryMapper,
    ProductTagMapper,
    TagMapper,
    ProductMapper,
    EmbedProductCategoryMapper,
  ],
})
export class ProductModule {}
