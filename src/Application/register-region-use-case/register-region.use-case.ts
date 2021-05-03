import { Currency, MonetaryValueObject } from '@domain/value-objects';
import { RegionRepository } from '@infra/region/repo/region.repository';
import { IUseCase, Result } from 'types-ddd';
import { RegisterRegionDto } from './register-region.use-case.dto';
import { CityRepository } from '@infra/region/repo/city.repository';
import { Region } from '@domain/aggregates-root';
import { Inject } from '@nestjs/common';

export class RegisterRegionUseCase
  implements IUseCase<RegisterRegionDto, Result<void>> {
  //
  constructor(
    @Inject(RegionRepository) private readonly regionRepo: RegionRepository,
    @Inject(CityRepository) private readonly cityRepo: CityRepository,
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
        'Internal server error on register region use case',
      );
    }
  }
}
