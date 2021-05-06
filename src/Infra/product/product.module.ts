import { RegisterProductCategoryUseCase } from '@app/register-product-category-use-case/register-product-category.use-case';
import { RegisterTagUseCase } from '@app/register-tag-use-case/register-tag.use-case';
import { ProductCategoryRepository } from './repo/product-category.repository';
import { ProductCategoryMapper } from './mapper/product-category.mapper';
import { ProductController } from './product.controller';
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
      { name: Tag.name, schema: TagSchema },
    ]),
  ],
  providers: [
    ProductCategoryMapper,
    TagMapper,
    ProductCategoryRepository,
    {
      provide: 'ProductCategoryRepository',
      useClass: ProductCategoryRepository,
    },
    {
      provide: 'TagRepository',
      useClass: TagRepository,
    },
    RegisterProductCategoryUseCase,
    RegisterTagUseCase,
    ProductService,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
