import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';
import { AvailableOrderStatusType } from '@domain/value-objects';
import { OrderAddress } from './order-address.schema';

// ------------------------------------------------------

type localeType = keyof typeof AvailableLocale;
type symbolType = keyof typeof AvailableCurrency;

export class Currency {
	@Prop({ type: Number, required: true })
	value!: number;

	@Prop({ type: String, required: true })
	symbol!: symbolType;

	@Prop({ type: String, required: true })
	locale!: localeType;
}

// ------------------------------------------------------

export type OrderDocument = Order & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class Order {
	@Prop({
		unique: true,
		index: true,
		type: String,
		immutable: true,
		required: true,
	})
	id!: string;

	@Prop({
		unique: true,
		index: true,
		type: String,
		immutable: true,
		required: true,
	})
	orderNumber!: string;

	@Prop({ type: String, required: true })
	clientName!: string;

	@Prop({ type: String, required: true, index: true })
	clientId!: string;

	@Prop({ type: Object, required: true })
	deliveryOrCollectionAddress!: OrderAddress;

	@Prop({ type: [{ type: String }], default: [] })
	separateProducts!: string[];

	@Prop({ type: [{ type: String }], default: [] })
	customBaskets!: string[];

	@Prop({ type: [{ type: String }], default: [] })
	basketPacks!: string[];

	@Prop({ type: String, required: true })
	status!: AvailableOrderStatusType;

	@Prop({ type: Object, required: true, default: 0 })
	costOfFreight!: Currency;

	@Prop({ type: Boolean, required: true })
	includesEcobag!: boolean;

	@Prop({ type: Boolean, required: true })
	isTheOrderForCollection!: boolean;

	@Prop({ type: Object, required: true, default: 0 })
	subTotalSeparateProducts!: Currency;

	@Prop({ type: Object, required: true, default: 0 })
	subTotalCustomBaskets!: Currency;

	@Prop({ type: Object, required: true, default: 0 })
	subtotalBasketPacks!: Currency;

	@Prop({ type: Object, required: true, default: 0 })
	amount!: Currency;

	@Prop({ type: Object, required: true, default: 0 })
	ecobagFee!: Currency;

	@Prop({ type: Date, default: new Date() })
	createdAt!: Date;

	@Prop({ type: Date, default: new Date() })
	updatedAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
