import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TagDocument = Tag & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Tag {
  @Prop({ index: true, unique: true, immutable: true, type: String })
  id!: string;

  @Prop({ index: true, unique: true, type: String, text: true })
  description!: string;
}

export const TagSchema = SchemaFactory.createForClass(Tag);
