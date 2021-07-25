import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ autoCreate: true, autoIndex: true })
export class Category {
	@Prop({
		type: String,
		required: true,
		index: true
	})
	id!: string;

	@Prop({ type: String, index: true, text: true, required: true })
	description!: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
