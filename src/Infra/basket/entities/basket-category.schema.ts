import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE } from '@domain/entities';

export type ProductCategoryDocument = BasketCategory & Document;

@Schema({ autoCreate: true, autoIndex: true })
export class BasketCategory {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  id!: string;

  @Prop({ type: String, index: true, text: true, required: true })
  description!: string;

  @Prop({ type: Number, max: BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE })
  changesLimit!: number;
}

export const ProductCategorySchema = SchemaFactory.createForClass(
  BasketCategory,
);
