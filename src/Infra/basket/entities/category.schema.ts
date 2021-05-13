import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MAX_BASKET_CATEGORY_CHANGE_LIMIT_VALUE } from '@domain/entities';

export type CategoryDocument = Category & Document;

@Schema({ autoCreate: true, autoIndex: true })
export class Category {
  @Prop({
    type: String,
    required: true,
    index: true,
  })
  id!: string;

  @Prop({ type: String, index: true, text: true, required: true, unique: true })
  description!: string;

  @Prop({ type: Number, max: MAX_BASKET_CATEGORY_CHANGE_LIMIT_VALUE })
  changesLimit!: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
