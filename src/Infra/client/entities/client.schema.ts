import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';

export type ClientDocument = Client & Document;

@Schema({ autoCreate: true, timestamps: true })
export class Client {
  @Prop({ type: String, required: true, index: true, immutable: true })
  readonly id!: string;

  @Prop({ type: String, required: true, index: true })
  name!: string;

  @Prop({ type: String, required: false })
  avatar?: string;

  @Prop({ type: Boolean, required: true, default: false })
  hasEcobag!: boolean;

  @Prop({ type: Array, required: true })
  addresses!: Array<Address>;

  @Prop({ type: Date, required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt!: Date;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
