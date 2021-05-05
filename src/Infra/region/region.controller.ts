import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
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
  constructor(
    @Inject(RegionService) private readonly regionService: RegionService,
  ) {}

  @Post()
  registerRegion(@Body() dto: RegisterRegionDto): Promise<void> {
    return this.regionService.registerRegion(dto);
  }

  @Post('city')
  registerCity(@Body() dto: RegisterCityDto): Promise<void> {
    return this.regionService.registerCity(dto);
  }

  @Get('city')
  getCities(): Promise<City[]> {
    return this.regionService.getCities();
  }

  @Get()
  getRegions(): Promise<Region[]> {
    return this.regionService.getRegions();
  }
}
