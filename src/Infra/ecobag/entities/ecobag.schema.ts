import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EcobagDocument = Ecobag & Document;

@Schema({ autoCreate: true, autoIndex: true, timestamps: true })
export class Ecobag {
	@Prop({
		index: true,
		unique: true,
		type: String,
		required: true,
		immutable: true
	})
	readonly id!: string;

	@Prop({ type: Number, required: true, default: 0 })
	price!: number;

	@Prop({ type: Date, required: true })
	updatedAt!: Date;
}

export const EcobagSchema = SchemaFactory.createForClass(Ecobag);
