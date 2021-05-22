import { Entity, Result, UniqueEntityID } from 'types-ddd';
import { BasketId } from '@domain/aggregates-root';
import { CustomBasketProps } from './custom-basket.domain-entity-interface';
import { ImageValueObject } from '@domain/value-objects';
import { QuantityAvailableValueObject } from '@domain/value-objects';
import { BasketDescriptionValueObject } from '@domain/value-objects';
import { BasketItemValueObject } from '@domain/value-objects';
import { MonetaryValueObject } from '@domain/value-objects';
import { BasketCategory } from '@domain/entities';

export class CustomBasket extends Entity<CustomBasketProps> {
  private constructor(props: CustomBasketProps) {
    super(props);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get basketId(): BasketId {
    return this.props.basketId;
  }

  get image(): ImageValueObject | undefined {
    return this.props.image;
  }

  get description(): BasketDescriptionValueObject {
    return this.props.description;
  }

  get category(): BasketCategory {
    return this.props.category;
  }

  get currentItems(): BasketItemValueObject[] {
    return this.props.currentItems;
  }

  get itemsAdded(): BasketItemValueObject[] {
    return this.props.itemsAdded;
  }

  get itemsRemoved(): BasketItemValueObject[] {
    return this.props.itemsRemoved;
  }

  get changesLimit(): number {
    return this.props.category.changesLimit.value;
  }

  private calculateTotalExchangesFactorOnRemovedItems(): number {
    const itemsRemoved = this.itemsRemoved;
    // Calculate based on removed items (sum quantity removed)
    const total = itemsRemoved.reduce(
      (total, item) =>
        item.value.quantity.value * item.value.exchangeFactor.value + total,
      0,
    );

    return total;
  }

  private calculateTotalExchangesFactorOnAddedItems(): number {
    const itemsAdded = this.itemsAdded;
    // Calculate based on removed items (quantity * exchange factor)
    const total = itemsAdded.reduce(
      (total, item) =>
        item.value.quantity.value * item.value.exchangeFactor.value + total,
      0,
    );

    return total;
  }

  private calculateTotalOfAddedItems(): number {
    // Calculate based on added items (sum quantity removed)
    const itemsAdded = this.itemsAdded;

    const total = itemsAdded.reduce(
      (total, item) => total + item.value.quantity.value,
      0,
    );

    return total;
  }

  get changesLimitAvailable(): number {
    //
    const totalChangesLimitCalculateOnAddedItems =
      this.calculateTotalOfAddedItems();

    const availableChangesLimit =
      this.changesLimit - totalChangesLimitCalculateOnAddedItems;

    return availableChangesLimit;
  }

  get exchangesFactorAvailable(): number {
    //
    const totalExchangesFactorCalculateOnRemovedItems =
      this.calculateTotalExchangesFactorOnRemovedItems();

    const totalExchangesFactorCalculateOnAddedItems =
      this.calculateTotalExchangesFactorOnAddedItems();

    const availableExchangesFactor =
      totalExchangesFactorCalculateOnRemovedItems -
      totalExchangesFactorCalculateOnAddedItems;

    return availableExchangesFactor;
  }

  get price(): MonetaryValueObject {
    return this.props.price;
  }

  get quantity(): QuantityAvailableValueObject {
    return this.props.quantity;
  }

  updateOrAddOneCurrentItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.currentItems = this.props.currentItems.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
    this.props.currentItems.push(item);
  }

  removeItemFromCurrentItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.currentItems = this.props.currentItems.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
  }

  updateOrAddOneRemovedItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.itemsRemoved = this.props.itemsRemoved.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
    this.props.itemsRemoved.push(item);
  }

  removeItemFromRemovedItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.itemsRemoved = this.props.itemsRemoved.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
  }

  updateOrAddOneAddedItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.itemsAdded = this.props.itemsAdded.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
    this.props.itemsAdded.push(item);
  }

  removeItemFromAddedItemOnCustomBasket(item: BasketItemValueObject): void {
    this.props.itemsAdded = this.props.itemsAdded.filter(
      ({ value }) => !value.productId.id.equals(item.value.productId.id),
    );
  }

  public static create(props: CustomBasketProps): Result<CustomBasket> {
    return Result.ok<CustomBasket>(new CustomBasket(props));
  }
}
