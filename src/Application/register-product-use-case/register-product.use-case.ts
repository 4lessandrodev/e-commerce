import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/UnitOfMeasurement.value-objects';
import { ProductCategoryRepositoryInterface } from '@repo/product-category-repository.interface';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { RegisterProductDto } from './register-product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { Product } from '@domain/aggregates-root';
import { IUseCase, Result } from 'types-ddd';

@Injectable()
export class RegisterProductUseCase
  implements IUseCase<RegisterProductDto, Result<void>>
{
  //
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
    @Inject('ProductCategoryRepository')
    private readonly productCategoryRepo: ProductCategoryRepositoryInterface,
    @Inject('TagRepository') private readonly tagRepo: TagRepositoryInterface,
  ) {}
  //
  async execute(dto: RegisterProductDto): Promise<Result<void>> {
    //----------------------------------------------------
    const currencyOrError = Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value: dto.price,
    });

    if (currencyOrError.isFailure) {
      return Result.fail<void>(currencyOrError.error.toString());
    }

    const currency = currencyOrError.getResult();

    //----------------------------------------------------

    const priceOrError = MonetaryValueObject.create(currency);

    if (priceOrError.isFailure) {
      return Result.fail<void>(priceOrError.error.toString());
    }

    const price = priceOrError.getResult();

    //----------------------------------------------------

    const unitOfMeasurementOrError = UnitOfMeasurementValueObject.create(
      dto.unitOfMeasurement,
    );

    if (unitOfMeasurementOrError.isFailure) {
      return Result.fail<void>(unitOfMeasurementOrError.error.toString());
    }

    const unitOfMeasurement = unitOfMeasurementOrError.getResult();

    //----------------------------------------------------

    try {
      const productAlreadyExists = await this.productRepo.exists({
        description: dto.description.toLowerCase(),
      });

      if (productAlreadyExists) {
        return Result.fail<void>('Product already exists');
      }

      //----------------------------------------------------
      //
      const category = await this.productCategoryRepo.findOne({
        id: dto.categoryId,
      });

      if (!category) {
        return Result.fail<void>('Category does not exists');
      }

      //----------------------------------------------------
      /**
       * @todo Calls uploader service to save product image if provided
       */
      const productOrError = Product.create({
        exchangeFactor: dto.exchangeFactor,
        unitOfMeasurement,
        category,
        price,
        description: dto.description,
        isSpecial: dto.isSpecial,
        isActive: dto.isActive,
        quantityAvailable: dto.quantityAvailable,
        info: dto.info,
      });
      //
      if (productOrError.isFailure) {
        return Result.fail<void>(productOrError.error.toString());
      }

      const product = productOrError.getResult();

      if (dto.tagsIds) {
        const foundTags = await this.tagRepo.findTagsById(dto.tagsIds);
        foundTags.map((tag) => product.addTag(tag));
      }

      await this.productRepo.save(product);

      return Result.ok<void>();
      //
    } catch (error) {
      console.log(error);

      return Result.fail<void>(
        'Internal Server Error on Register Product Use Case',
      );
    }
  }
}
