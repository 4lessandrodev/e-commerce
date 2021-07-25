import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterCityUseCase } from '@app/register-city-use-case/register-city.use-case';
import { RegisterRegionUseCase } from '@app/register-region-use-case/register-region.use-case';
import { UserModule } from '../user/user.module';
import { City, CitySchema } from './entities/city.schema';
import { Region, RegionSchema } from './entities/region.schema';
import { RegionService } from './region.service';
import { CityMapper } from './mapper/city.mapper';
import { CityRepository } from './repo/city.repository';
import { RegionMapper } from './mapper/region.mapper';
import { RegionRepository } from './repo/region.repository';
import { RegionController } from './region.controller';
import { CityQuery } from './query/city.query';
import { RegionQuery } from './query/region.query';

@Module({
	imports: [
		UserModule,
		MongooseModule.forFeature([
			{ name: City.name, schema: CitySchema },
			{ name: Region.name, schema: RegionSchema }
		])
	],
	providers: [
		CityMapper,
		RegionMapper,
		{
			provide: 'CityRepository',
			useClass: CityRepository
		},
		{
			provide: 'RegionRepository',
			useClass: RegionRepository
		},
		CityQuery,
		RegionQuery,
		RegisterCityUseCase,
		RegisterRegionUseCase,
		RegionService
	],
	controllers: [RegionController],
	exports: ['RegionRepository']
})
export class RegionModule {}
