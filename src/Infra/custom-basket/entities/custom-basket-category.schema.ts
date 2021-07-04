import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ autoIndex: true })
export class CustomBasketCategory {
	@Prop()
	changesLimit!: number;

	@Prop()
	description!: string;
}
