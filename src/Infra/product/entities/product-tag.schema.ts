import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductTagDocument = ProductTag & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class ProductTag {
	@Prop({ index: true, unique: true, immutable: true, type: String })
	id!: string;

	@Prop({ index: true, unique: true, type: String })
	description!: string;

	@Prop({ type: Date, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, default: new Date() })
	updatedAt!: Date;
}

const ProductTagSchema = SchemaFactory.createForClass(ProductTag);

ProductTagSchema.virtual('Tag', {
	ref: 'ProductTag',
	localField: 'id',
	foreignField: 'id'
});

export { ProductTagSchema };
