import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AvailableInitials } from '@domain/value-objects';
import { Document } from 'mongoose';

export type initials = keyof typeof AvailableInitials;

export type CityDocument = City & Document;

@Schema({ autoCreate: true, timestamps: true, autoIndex: true })
export class City {
	@Prop({
		type: String,
		required: true,
		index: true,
		immutable: true,
		unique: true
	})
	readonly id!: string;

	@Prop({ type: String, required: true, index: true })
	name!: string;

	@Prop({ type: Number, required: true, index: true })
	geoCode!: number;

	@Prop({ enum: AvailableInitials, required: true })
	stateInitial!: initials;

	@Prop({ type: Date, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, default: new Date() })
	updatedAt!: Date;
}

export const CitySchema = SchemaFactory.createForClass(City);
