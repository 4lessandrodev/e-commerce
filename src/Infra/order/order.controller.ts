import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddItemToCustomBasketDto } from './dto/add-item-to-custom-basket.dto';
import { OrderService } from './order.service';

@Controller('v1/order')
export class OrderController {
	constructor (
		@Inject(OrderService)
		private readonly service: OrderService
	) { }

	@Post('add-item')
	addItemToCustomBasket (@Body() dto: AddItemToCustomBasketDto): Promise<void> {
		return this.service.addItemToCustomBasket(dto);
	};
}
