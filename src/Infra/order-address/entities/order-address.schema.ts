import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = OrderAddress & Document;

@Schema({
  autoCreate: true,
  timestamps: true,
  autoIndex: true,
})
export class OrderAddress {
  @Prop({
    type: String,
    required: true,
    index: true,
    immutable: true,
    unique: true,
  })
  readonly id!: string;

  @Prop({ type: String, required: true, index: true })
  zipCode!: string;

  @Prop({ type: String, required: true })
  street!: string;

  @Prop({ type: String, required: true })
  number!: string;

  @Prop({ type: String, required: false })
  complement!: string;

  @Prop({ type: String, required: true })
  regionId!: string;

  @Prop({ type: Date, required: true, default: new Date() })
  createdAt!: Date;

  @Prop({ type: Date, required: true, default: new Date() })
  updatedAt!: Date;
}

export const AddressSchema = SchemaFactory.createForClass(OrderAddress);

AddressSchema.virtual('Region', {
  ref: 'Region',
  localField: 'regionId',
  foreignField: 'id',
  autopopulate: true,
});

AddressSchema.plugin(require('mongoose-autopopulate'));
