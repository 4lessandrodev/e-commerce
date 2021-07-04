import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from './custom-basket-item.schema';
import { CustomBasketCategory } from './custom-basket-category.schema';
import { AvailableCurrency, AvailableLocale } from '@domain/value-objects';


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

export type CustomBasketDocument = CustomBasket & Document;

@Schema({ timestamps: true, autoCreate: true, autoIndex: true })
export class CustomBasket {
	@Prop({
		index: true,
		type: String,
		immutable: true,
		required: true,
	})
	id!: string;

	@Prop({
		index: true,
		type: String,
		immutable: true,
		required: true,
	})
	basketId!: string;

	@Prop({ type: String, required: false })
	image?: string;

	@Prop({
		type: String,
		index: true,
		required: true,
	})
	description!: string;

	@Prop({ type: Object, required: false })
	category!: CustomBasketCategory;

	@Prop({ type: [{ type: Object, required: false }], default: [] })
	items!: Item[];

	@Prop({ type: [{ type: Object, required: false }], default: [] })
	itemsAdded!: Item[];

	@Prop({ type: [{ type: Object, required: false }], default: [] })
	itemsRemoved!: Item[];

	@Prop({ type: Number, required: true })
	changesLimitAvailable!: number;

	@Prop({ type: Number, required: true })
	exchangesFactorAvailable!: number;

	@Prop({ type: Boolean, required: true })
	isDraft!: boolean;

	@Prop({ type: Currency, required: true })
	price!: Currency;

	@Prop({ type: Number, required: true, default: 0 })
	quantity!: number;
}

export const CustomBasketSchema = SchemaFactory.createForClass(CustomBasket);