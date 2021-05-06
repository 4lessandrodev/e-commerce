import { CityRepositoryInterface } from '@repo/city.repository.interface';
import { InitialStateValueObject } from '@domain/value-objects';
import { RegisterCityDto } from './register-city.use-case.dto';
import { IUseCase, Result } from 'types-ddd';
import { Inject } from '@nestjs/common';
import { City } from '@domain/entities';

export class RegisterCityUseCase
  implements IUseCase<RegisterCityDto, Result<void>> {
  constructor(
    @Inject('CityRepository')
    private readonly cityRepo: CityRepositoryInterface,
  ) {}

  async execute(dto: RegisterCityDto): Promise<Result<void>> {
    //
    const stateOrError = InitialStateValueObject.create(dto.state);

    if (stateOrError.isFailure) {
      return Result.fail<void>(stateOrError.error as string);
    }

    const state = stateOrError.getResult();

    try {
      //
      const cityAlreadyExists = await this.cityRepo.exists({
        geoCode: dto.geoCode,
      });

      if (cityAlreadyExists) {
        return Result.fail<void>('city already exists');
      }

      const city = City.create({
        geoCode: dto.geoCode,
        name: dto.name,
        stateInitial: state,
      }).getResult();

      await this.cityRepo.save(city);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Register City Use Case',
      );
    }
  }
}
