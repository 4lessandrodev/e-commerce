import { Result, UniqueEntityID } from '../../../Shared';
import { image, random } from 'faker';
import { Product } from '../../aggregates-root/product/Product.domain-aggregate-root';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { ProductCategory } from '../product-category/ProductCategory.domain-entity';
import { ItemProps } from './Item.domain-entity-interface';
import { ERROR_ITEM_INVALID_QUANTITY } from './ItemErrors.domain-entity';
import { ItemProduct } from './ItemProduct.domain-entity';
import { ItemId } from './ItemId.domain-entity';

describe('ItemProduct.domain-entity', () => {
  const makeSut = (
    props?: ItemProps<Product>,
    id?: UniqueEntityID,
  ): Result<ItemProduct> => {
    return ItemProduct.create(
      {
        item:
          props?.item ??
          Product.create({
            description: 'Pera Brasileira',
            category: ProductCategory.create({
              description: 'Pera Portuguesa',
            }).getResult(),
            images: [ImageValueObject.create(image.imageUrl()).getResult()],
            info: random.words(7),
            isActive: true,
            isSpecial: false,
            price: MonetaryValueObject.create(9.9).getResult(),
            quantityAvaliable: 3,
          }).getResult(),
        orderId: props?.orderId ?? new UniqueEntityID(),
        quantity: props?.quantity ?? 1,
        total: props?.total ?? MonetaryValueObject.create(10).getResult(),
      },
      id,
    );
  };

  it('Should create a valid ItemProduct', () => {
    const itemCreated = makeSut();
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().item).toBeInstanceOf(Product);
    expect(itemCreated.getResult().quantity).toBe(1);
    expect(itemCreated.getResult().total.value).toBe(10);
    expect(itemCreated.getResult().orderId).toBeDefined();
  });

  it('Should fail if provide a negative number', () => {
    const props = makeSut().getResult().props;
    const itemCreated = makeSut({
      ...props,
      quantity: -1,
    });
    expect(itemCreated.isFailure).toBe(true);
    expect(itemCreated.error).toBe(ERROR_ITEM_INVALID_QUANTITY);
  });

  it('Should create a valid ItemProduct with provided id', () => {
    const props = makeSut().getResult().props;
    const providedId = ItemId.create().id;
    const itemCreated = makeSut(
      {
        ...props,
      },
      providedId,
    );
    expect(itemCreated.isFailure).toBe(false);
    expect(itemCreated.getResult().id.toString()).toBe(providedId.toString());
  });
});
