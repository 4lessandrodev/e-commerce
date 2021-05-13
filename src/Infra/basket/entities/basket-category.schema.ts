import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MAX_BASKET_CATEGORY_CHANGE_LIMIT_VALUE } from '@domain/entities';

export type BasketCategoryDocument = BasketCategory & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class BasketCategory {
  @Prop({
    type: String,
    required: true,
    index: true,
    immutable: true,
    unique: true,
  })
  id!: string;

  @Prop({ type: String, index: true, required: true, unique: true })
  description!: string;

  @Prop({ type: Number, max: MAX_BASKET_CATEGORY_CHANGE_LIMIT_VALUE })
  changesLimit!: number;

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

export const BasketCategorySchema =
  SchemaFactory.createForClass(BasketCategory);
