import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ autoCreate: true, autoIndex: true })
export class ProductCategory {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  id!: string;

  @Prop({ type: String, index: true, text: true, required: true })
  description!: string;
}

export const ProductCategorySchema = SchemaFactory.createForClass(
  ProductCategory,
);
