import {
	Body,
	Put,
	ValidationPipe,
	Controller,
	Inject,
	Post,
	UseGuards,
	UsePipes
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { DefineEcobagPriceDto } from './dto/define-ecobag-price.dto';
import { EcobagService } from './ecobag.service';

@Controller('v1/ecobag')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class EcobagController {
	constructor(
		@Inject(EcobagService)
		private readonly service: EcobagService
	) {}

	@Post()
	defineEcobagPrice(@Body() dto: DefineEcobagPriceDto): Promise<void> {
		return this.service.defineEcobagPrice(dto);
	}

	@Put()
	async updateEcobagPrice(@Body() dto: DefineEcobagPriceDto): Promise<void> {
		return await this.service.defineEcobagPrice(dto);
	}
}
