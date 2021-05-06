import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { IUseCase, Result } from 'types-ddd';
import { RegisterRegionDto } from './register-region.use-case.dto';
import { Region } from '@domain/aggregates-root';
import { Inject } from '@nestjs/common';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { CityRepositoryInterface } from '@repo/city.repository.interface';

export class RegisterRegionUseCase
  implements IUseCase<RegisterRegionDto, Result<void>> {
  //
  constructor(
    @Inject('RegionRepository')
    private readonly regionRepo: RegionRepositoryInterface,
    @Inject('CityRepository')
    private readonly cityRepo: CityRepositoryInterface,
  ) {}
  //
  async execute(dto: RegisterRegionDto): Promise<Result<void>> {
    //

    const currencyOrError = Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value: dto.freightPrice,
    });

    if (currencyOrError.isFailure) {
      return Result.fail<void>(currencyOrError.error as string);
    }

    const currency = currencyOrError.getResult();
    const monetaryValueOrError = MonetaryValueObject.create(currency);

    if (monetaryValueOrError.isFailure) {
      return Result.fail<void>(monetaryValueOrError.error as string);
    }

    const freightPrice = monetaryValueOrError.getResult();

    try {
      const alreadyExistRegion = await this.regionRepo.exists({
        description: dto.description,
      });
      if (alreadyExistRegion) {
        return Result.fail<void>('Already exist region with provided name');
      }
      //
      const existCity = await this.cityRepo.findOne({ id: dto.cityId });

      if (!existCity) {
        return Result.fail<void>('City does not exist');
      }
      //

      const regionOrError = Region.create({
        city: existCity,
        freightPrice,
        description: dto.description,
        isActive: dto.isActive,
      });

      if (regionOrError.isFailure) {
        return Result.fail<void>(regionOrError.error as string);
      }

      const region = regionOrError.getResult();

      await this.regionRepo.save(region);

      return Result.ok<void>();
      //
    } catch (error) {
      return Result.fail<void>(
        'Internal Server Error on Register Region Use Case',
      );
    }
  }
}
