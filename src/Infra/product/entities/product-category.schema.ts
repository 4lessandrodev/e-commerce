import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class ProductCategory {
  @Prop({ type: String, required: true, index: true, immutable: true })
  readonly id!: string;

  @Prop({ type: String, index: true, required: true })
  description!: string;

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

export const ProductCategorySchema = SchemaFactory.createForClass(
  ProductCategory,
);
