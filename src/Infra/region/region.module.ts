import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterCityUseCase } from '@app/register-city-use-case/register-city.use-case';
import { RegisterRegionUseCase } from '@app/register-region-use-case/register-region.use-case';
import { UserModule } from '../user/user.module';
import { City, CitySchema } from './entities/city.schema';
import { Region, RegionSchema } from './entities/region.schema';
import { RegionService } from './region.service';
import { CityMapper } from './repo/city.mapper';
import { CityRepository } from './repo/city.repository';
import { RegionMapper } from './repo/region.mapper';
import { RegionRepository } from './repo/region.repository';
import { RegionController } from './region.controller';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: City.name, schema: CitySchema },
      { name: Region.name, schema: RegionSchema },
    ]),
  ],
  providers: [
    CityMapper,
    RegionMapper,
    CityRepository,
    RegionRepository,
    RegisterCityUseCase,
    RegisterRegionUseCase,
    RegionService,
  ],
  controllers: [RegionController],
})
export class RegionModule {}
