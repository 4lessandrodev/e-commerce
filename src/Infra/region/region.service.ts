import { RegisterRegionDto } from './dto/register-region.dto';
import { RegisterCityDto } from './dto/register-city.dto';
import { RegisterCityUseCase } from '@app/register-city-use-case/register-city.use-case';
import { RegisterRegionUseCase } from '@app/register-region-use-case/register-region.use-case';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';

@Injectable()
export class RegionService {
  constructor(
    @Inject(RegisterCityUseCase)
    private readonly registerCityUseCase: RegisterCityUseCase,
    @Inject(RegisterRegionUseCase)
    private readonly registerRegionUseCase: RegisterRegionUseCase,
  ) {}

  async registerCity(dto: RegisterCityDto): Promise<void> {
    const result = await this.registerCityUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerRegion(dto: RegisterRegionDto): Promise<void> {
    const result = await this.registerRegionUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
