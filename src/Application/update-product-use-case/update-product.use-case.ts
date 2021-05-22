import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { ProductRepositoryInterface } from '@repo/product-repository.interface';
import { UpdateProductDto } from './update-product.dto';
import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { ProductInfoValueObject } from '@domain/value-objects';
import { ExchangeFactorValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { ProductDescriptionValueObject } from '@domain/value-objects';
import { UnitOfMeasurementValueObject } from '@domain/value-objects';

@Injectable()
export class UpdateProductUseCase
  implements IUseCase<UpdateProductDto, Result<void>>
{
  //
  constructor(
    @Inject('ProductRepository')
    private readonly productRepo: ProductRepositoryInterface,
  ) {}

  async execute(dto: UpdateProductDto): Promise<Result<void>> {
    //
    const currencyOrError = Currency.create(dto.price);

    if (currencyOrError.isFailure) {
      return Result.fail<void>(currencyOrError.error.toString());
    }

    const currency = currencyOrError.getResult();

    const descriptionOrError = ProductDescriptionValueObject.create(
      dto.description,
    );
    const exchangeFactorOrError = ExchangeFactorValueObject.create(
      dto.exchangeFactor,
    );
    const unitOfMeasurementOrError = UnitOfMeasurementValueObject.create(
      dto.unitOfMeasurement,
    );
    const priceOrError = MonetaryValueObject.create(currency);

    const quantityAvailableOrError = QuantityAvailableValueObject.create(
      dto.quantityAvailable,
    );

    const checkResults = Result.combine([
      descriptionOrError,
      exchangeFactorOrError,
      unitOfMeasurementOrError,
      priceOrError,
      quantityAvailableOrError,
    ]);

    if (checkResults.isFailure) {
      return Result.fail<void>(checkResults.error);
    }

    let info: ProductInfoValueObject | undefined;
    if (dto.info) {
      const infoOrError = ProductInfoValueObject.create(dto.info);
      if (infoOrError.isFailure) {
        return Result.fail<void>(infoOrError.error.toString());
      }
      info = infoOrError.getResult();
    }

    const description = descriptionOrError.getResult();
    const exchangeFactor = exchangeFactorOrError.getResult();
    const unitOfMeasurement = unitOfMeasurementOrError.getResult();
    const price = priceOrError.getResult();
    const quantityAvailable = quantityAvailableOrError.getResult();

    try {
      const productExists = await this.productRepo.findOne({
        id: dto.productId,
      });

      if (!productExists) {
        return Result.fail<void>('Product does not exists');
      }

      const product = productExists;
      product.changeDescription(description);
      product.changePrice(price);
      product.changeExchangeFactor(exchangeFactor);
      product.changeUnitOfMeasurement(unitOfMeasurement);
      product.launchStock(quantityAvailable);
      product.changeInfo(info);

      dto.isActive ? product.activate() : product.deactivate();
      dto.isSpecial ? product.setAsSpecial() : product.setAsNotSpecial();

      await this.productRepo.save(product);

      return Result.ok<void>();
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Update Product Use Case',
      );
    }
  }
}
