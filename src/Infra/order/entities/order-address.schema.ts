import { Prop } from '@nestjs/mongoose';

export class OrderAddress {
	@Prop({ type: String, required: true, index: true })
	zipCode!: string;

	@Prop({ type: String, required: true })
	street!: string;

	@Prop({ type: String, required: true })
	number!: string;

	@Prop({ type: String, required: false })
	complement!: string;

	@Prop({ type: String, required: true, index: true })
	regionId!: string;
}
