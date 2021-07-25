import {
	Body,
	Controller,
	Delete,
	Inject,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../user/interfaces/jwt.payload.interface';
import { GetUser } from '../user/services/get-user.decorator';
import { AddItemToCustomBasketDto } from './dto/add-item-to-custom-basket.dto';
import { RemoveItemFromCustomBasketDto } from './dto/remove-item-from-custom-basket.dto';
import { OrderService } from './order.service';

@Controller('v1/order')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class OrderController {
	constructor(
		@Inject(OrderService)
		private readonly service: OrderService
	) {}

	@Post('add-item')
	addItemToCustomBasket(
		@GetUser() user: JwtPayload,
		@Body() dto: AddItemToCustomBasketDto
	): Promise<void> {
		dto.clientId = user.id;
		return this.service.addItemToCustomBasket(dto);
	}

	@Delete('remove-item')
	async removeItemFromCustomBasket(
		@GetUser() user: JwtPayload,
		@Body() dto: RemoveItemFromCustomBasketDto
	): Promise<void> {
		dto.clientId = user.id;
		return await this.service.removeItemFromCustomBasket(dto);
	}
}
