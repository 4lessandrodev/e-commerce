import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { UserModule } from '../user/user.module';
import {
  ProductCategory,
  ProductCategorySchema,
} from './entities/product-category.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductCategoryMapper } from './repo/product-category.mapper';
import { ProductCategoryRepository } from './repo/product-category.repository';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: ProductCategory.name, schema: ProductCategorySchema },
    ]),
  ],
  providers: [
    ProductCategoryMapper,
    ProductCategoryRepository,
    RegisterProductCategoryUseCase,
    ProductService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
