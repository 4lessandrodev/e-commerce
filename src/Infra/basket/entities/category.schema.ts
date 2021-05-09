import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE } from '@domain/entities';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Category {
  @Prop({
    type: String,
    required: true,
    index: true,
    immutable: true,
    unique: true,
  })
  id!: string;

  @Prop({ type: String, index: true, required: true })
  description!: string;

  @Prop({ type: Number, max: BASKET_CATEGORY_CHANGE_LIMIT_MAX_VALUE })
  changesLimit!: number;

  @Prop({ type: Date, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, default: new Date() })
  updatedAt!: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
