import {
	Body,
	Post,
	UsePipes,
	Param,
	UseGuards,
	ValidationPipe,
	Put,
	Delete,
	Inject,
	Controller
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateAddressDto } from './dto/create-address.dto';
import { AddressIdDto } from './dto/delete-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { OrderAddressService } from './order-address.service';

@Controller('v1/pickup-address')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class OrderAddressController {
	constructor(
		@Inject(OrderAddressService)
		private readonly service: OrderAddressService
	) {}

	@Post()
	createAddress(@Body() dto: CreateAddressDto): Promise<void> {
		return this.service.createAddress(dto);
	}

	@Put('/:id')
	async updateAddress(
		@Body() dto: UpdateAddressDto,
		@Param() param: AddressIdDto
	): Promise<void> {
		dto.id = param.id;
		return await this.service.updateAddress(dto);
	}

	@Delete('/:id')
	async deleteAddress(@Param() dto: AddressIdDto): Promise<void> {
		return await this.service.deleteAddress(dto);
	}
}
