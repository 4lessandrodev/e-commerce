import { ProductCategoryRepositoryInterface } from '@repo/product-category-repository.interface';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { ProductInfoValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { RegisterProductDto } from './register-product.dto';
import { Inject, Injectable } from '@nestjs/common';
import { QuantityInStockValueObject } from '@domain/value-objects';
import { Product } from '@domain/aggregates-root';
import { IUseCase, Result } from 'types-ddd';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';

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
    const currencyOrError = Currency.create(dto.price);

    if (currencyOrError.isFailure) {
      return Result.fail<void>(currencyOrError.error.toString());
    }

    const currency = currencyOrError.getResult();

    //----------------------------------------------------

    const priceOrError = MonetaryValueObject.create(currency);

    const unitOfMeasurementOrError = UnitOfMeasurementValueObject.create(
      dto.unitOfMeasurement,
    );

    const exchangeFactorOrError = ExchangeFactorValueObject.create(
      dto.exchangeFactor,
    );

    const descriptionOrError = ProductDescriptionValueObject.create(
      dto.description,
    );

    const quantityAvailableOrError = QuantityInStockValueObject.create(
      dto.quantityAvailable,
    );

    const checkErrors = Result.combine([
      priceOrError,
      unitOfMeasurementOrError,
      exchangeFactorOrError,
      descriptionOrError,
    ]);

    if (checkErrors.isFailure) {
      return Result.fail<void>(checkErrors.error);
    }

    const price = priceOrError.getResult();
    const unitOfMeasurement = unitOfMeasurementOrError.getResult();
    const exchangeFactor = exchangeFactorOrError.getResult();
    const description = descriptionOrError.getResult();
    const quantityAvailable = quantityAvailableOrError.getResult();
    //----------------------------------------------------

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

      let info: ProductInfoValueObject | undefined;

      if (dto.info) {
        const infoOrError = ProductInfoValueObject.create(dto.info);
        if (infoOrError.isFailure) {
          return Result.fail<void>(infoOrError.error.toString());
        }
        info = infoOrError.getResult();
      }

      //----------------------------------------------------

      /**
       * @todo Calls uploader service to save product image if provided
       */
      const productOrError = Product.create({
        exchangeFactor,
        unitOfMeasurement,
        category,
        price,
        description,
        quantityAvailable,
        info,
        isSpecial: dto.isSpecial,
        isActive: dto.isActive,
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
