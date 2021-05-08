import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductTagDocument = ProductTag & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class ProductTag {
  @Prop({ index: true, unique: true, immutable: true, type: String })
  id!: string;

  @Prop({ index: true, unique: true, type: String, text: true })
  description!: string;
}

const ProductTagSchema = SchemaFactory.createForClass(ProductTag);

ProductTagSchema.virtual('Tag', {
  ref: 'Tag',
  localField: 'id',
  foreignField: 'id',
});

export { ProductTagSchema };
