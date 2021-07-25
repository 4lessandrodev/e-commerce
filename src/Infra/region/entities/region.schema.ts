import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { City } from './city.schema';

type localeType = keyof typeof AvailableLocale;
type symbolType = keyof typeof AvailableCurrency;

export class Currency {
	@Prop({ type: Number, required: true })
	value!: number;

	@Prop({ type: String, required: true })
	symbol!: symbolType;

	@Prop({ type: String, required: true })
	locale!: localeType;
}

export type RegionDocument = Region & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class Region {
	@Prop({
		type: String,
		required: true,
		index: true,
		immutable: true,
		unique: true
	})
	id!: string;

	@Prop({ type: String, required: true, index: true })
	description!: string;

	@Prop({ type: Currency, required: true })
	freightPrice!: Currency;

	@Prop({ type: Boolean, required: true })
	isActive!: boolean;

	@Prop({ required: true, type: Object })
	city!: City;

	@Prop({ type: Date, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, default: new Date() })
	updatedAt!: Date;
}

const RegionSchema = SchemaFactory.createForClass(Region);

RegionSchema.virtual('City', {
	ref: 'City',
	localField: 'city.id',
	foreignField: 'id',
	justOne: true
});

export { RegionSchema };
