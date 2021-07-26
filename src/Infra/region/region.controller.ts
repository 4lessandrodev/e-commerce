import {
	Body,
	Controller,
	Get,
	Inject,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterCityDto } from './dto/register-city.dto';
import { RegisterRegionDto } from './dto/register-region.dto';
import { City } from './entities/city.schema';
import { Region } from './entities/region.schema';
import { RegionService } from './region.service';

@Controller('v1/region')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class RegionController {
	//
	constructor (
		@Inject(RegionService) private readonly regionService: RegionService
	) { }

	@Post()
	async registerRegion (@Body() dto: RegisterRegionDto): Promise<void> {
		return await this.regionService.registerRegion(dto);
	}

	@Post('city')
	async registerCity (@Body() dto: RegisterCityDto): Promise<void> {
		return await this.regionService.registerCity(dto);
	}

	@Get('city')
	async getCities (): Promise<City[]> {
		return await this.regionService.getCities();
	}

	@Get()
	async getRegions (): Promise<Region[]> {
		return await this.regionService.getRegions();
	}
}
