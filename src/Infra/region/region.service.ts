import { RegisterRegionDto } from './dto/register-region.dto';
import { RegisterCityDto } from './dto/register-city.dto';
import { RegisterCityUseCase } from '@app/register-city-use-case/register-city.use-case';
import { RegisterRegionUseCase } from '@app/register-region-use-case/register-region.use-case';
import { Inject, Injectable } from '@nestjs/common';
import { PreconditionFailedException } from '@nestjs/common';
import { CityQuery } from './query/city.query';
import { City } from './entities/city.schema';
import { RegionQuery } from './query/region.query';
import { Region } from './entities/region.schema';
import { Result } from 'types-ddd';

@Injectable()
export class RegionService {
  constructor(
    @Inject(RegisterCityUseCase)
    private readonly registerCityUseCase: RegisterCityUseCase,

    @Inject(RegisterRegionUseCase)
    private readonly registerRegionUseCase: RegisterRegionUseCase,

    @Inject(CityQuery) private readonly cityQuery: CityQuery,

    @Inject(RegionQuery) private readonly regionQuery: RegionQuery,
  ) {}

  private checkResult(result: Result<void>): void {
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerCity(dto: RegisterCityDto): Promise<void> {
    const result = await this.registerCityUseCase.execute(dto);
    this.checkResult(result);
  }

  async registerRegion(dto: RegisterRegionDto): Promise<void> {
    const result = await this.registerRegionUseCase.execute(dto);
    this.checkResult(result);
  }

  // Queries
  async getCities(): Promise<City[]> {
    return await this.cityQuery.getCities();
  }

  async getRegions(): Promise<Region[]> {
    return await this.regionQuery.getRegions();
  }
}
