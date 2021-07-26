import { Prop, Schema } from '@nestjs/mongoose';
import { UnitTypes } from '@domain/value-objects';

@Schema({ autoIndex: true })
export class Item {
	@Prop()
	exchangeFactor!: number;

	@Prop()
	productId!: string;

	@Prop()
	quantity!: number;

	@Prop()
	description!: string;

	@Prop()
	unitOfMeasurement!: UnitTypes;

	@Prop()
	image?: string;
}
