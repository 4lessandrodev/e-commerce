import { ERROR_BASKET_PRICE } from './basket-errors.domain-aggregate-root';
import {
	ImageValueObject,
	MonetaryValueObject,
	BasketInfoValueObject,
	BasketItemValueObject,
	BasketDescriptionValueObject
} from '@domain/value-objects';

import { BasketProps } from './basket.domain-aggregate-root-interface';
import { BasketCategory, Tag, CommentId } from '@domain/entities';
import { AggregateRoot, Result, UniqueEntityID } from 'types-ddd';
import { ProductId } from '@domain/aggregates-root';

export const MAX_BASKET_RATING_AVERAGE = 5;

export class Basket extends AggregateRoot<BasketProps> {
	private constructor(props: BasketProps, id?: UniqueEntityID) {
		super(props, id);
	}

	get id(): UniqueEntityID {
		return this._id;
	}

	get description(): BasketDescriptionValueObject {
		return this.props.description;
	}

	get category(): BasketCategory {
		return this.props.category;
	}

	get products(): BasketItemValueObject[] {
		return this.props.items ?? [];
	}

	get price(): MonetaryValueObject {
		return this.props.price;
	}

	get isActive(): boolean {
		return this.props.isActive;
	}

	get info(): BasketInfoValueObject | undefined {
		return this.props.info;
	}

	get numberOfRatings(): number {
		return this.props.numberOfRatings ?? 0;
	}

	get ratingAverage(): number {
		return this.props.ratingAverage ?? 0;
	}

	get images(): ImageValueObject[] {
		return this.props.images ?? [];
	}

	get comments(): CommentId[] {
		return this.props.comments ?? [];
	}

	get tags(): Tag[] {
		return this.props.tags ?? [];
	}

	rateTheBasket(props: {
		numberOfRatings: number;
		ratingAverage: number;
	}): void {
		if (props.ratingAverage > MAX_BASKET_RATING_AVERAGE) {
			return;
		}
		this.props.ratingAverage = props.ratingAverage;
		this.props.numberOfRatings = props.numberOfRatings;
		this.props.updatedAt = new Date();
	}

	changePrice(price: MonetaryValueObject): Result<void> {
		if (!price.isPositive()) {
			return Result.fail<void>(ERROR_BASKET_PRICE);
		}
		this.props.price = price;
		this.props.updatedAt = new Date();
		return Result.ok<void>();
	}

	addImage(image: ImageValueObject): void {
		this.props.images = this.props.images ?? [];
		this.props.images.push(image);
		this.props.updatedAt = new Date();
	}

	removeImage(image: ImageValueObject): void {
		if (this.props.images == null) {
			return;
		}
		this.props.images = this.props.images.filter(
			(img) => img.value !== image.value
		);
		this.props.updatedAt = new Date();
	}

	deactivate(): void {
		this.props.isActive = false;
		this.props.updatedAt = new Date();
	}

	activate(): void {
		this.props.isActive = true;
		this.props.updatedAt = new Date();
	}

	addComment(commentId: CommentId): void {
		const existComments = this.props.comments ?? null;
		this.props.comments = [commentId];
		if (existComments != null) {
			this.props.comments = this.props.comments.concat(existComments);
		}
	}

	removeComment(commentId: CommentId): void {
		const existComments = this.props.comments ?? null;
		if (existComments == null) {
			return;
		}
		this.props.comments = existComments.filter(
			(cmt) => !cmt.id.equals(commentId.id)
		);
	}

	addTag(tag: Tag): void {
		const existTags = this.props.tags ?? null;
		this.props.tags = [tag];
		if (existTags != null) {
			this.props.tags = this.props.tags.concat(existTags);
		}
	}

	removeTag(tag: Tag): void {
		const existTags = this.props.tags ?? null;
		if (existTags == null) {
			return;
		}
		this.props.tags = existTags.filter((tg) => !tg.id.equals(tag.id));
	}

	addProduct(item: BasketItemValueObject): void {
		const existProducts = this.props.items ?? null;
		this.props.items = [item];
		if (existProducts != null) {
			this.props.items = this.props.items.concat(existProducts);
		}
	}

	removeProduct(productId: ProductId): void {
		const existProducts = this.props.items ?? null;
		if (existProducts == null) {
			return;
		}
		this.props.items = existProducts.filter(
			(item) => !item.value.productId.id.equals(productId.id)
		);
	}

	changeDescription(description: BasketDescriptionValueObject): void {
		this.props.description = description;
		this.props.updatedAt = new Date();
	}

	changeInfo(info: BasketInfoValueObject | undefined): void {
		this.props.info = info;
		this.props.updatedAt = new Date();
	}

	public static create(
		props: BasketProps,
		id?: UniqueEntityID
	): Result<Basket> {
		if (!props.price.isPositive()) {
			return Result.fail<Basket>(ERROR_BASKET_PRICE);
		}
		return Result.ok<Basket>(new Basket(props, id));
	}
}
