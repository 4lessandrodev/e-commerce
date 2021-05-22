import { ERROR_BASKET_PRICE } from './basket-errors.domain-aggregate-root';
import { image } from 'faker';
import { Result, UniqueEntityID } from 'types-ddd';
import { Basket } from '@domain/aggregates-root';
import { BasketCategory, Comment, CommentId, Tag } from '@domain/entities';
import {
  ExchangeFactorValueObject,
  ImageValueObject,
  MonetaryValueObject,
  ProductDescriptionValueObject,
  QuantityInStockValueObject,
  UnitOfMeasurementValueObject,
} from '@domain/value-objects';
import { BasketItemValueObject } from '@domain/value-objects';
import { Currency } from '@domain/value-objects/monetary/currency.value-object';
import { BasketProps } from './basket.domain-aggregate-root-interface';
import { BasketId } from './basket-id.domain-aggregate-root';
import { ProductId } from '../product/product-id.domain-aggregate-root';
import { BasketDescriptionValueObject } from '@domain/value-objects';
import { BasketInfoValueObject } from '@domain/value-objects';

describe('Basket.domain-aggregate-root', () => {
  const makePrice = (value: number): Currency => {
    return Currency.create(value).getResult();
  };
  const makeSut = (
    props?: BasketProps,
    id?: UniqueEntityID,
  ): Result<Basket> => {
    return Basket.create(
      {
        description:
          props?.description ??
          BasketDescriptionValueObject.create('Basket 5 itens').getResult(),
        category:
          props?.category ??
          BasketCategory.create({
            changesLimit: 3,
            description: 'Mini Basket',
          }).getResult(),
        isActive: props?.isActive ?? true,
        price:
          props?.price ?? MonetaryValueObject.create(makePrice(1)).getResult(),
        items: props?.items ?? [
          BasketItemValueObject.create({
            exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
            productId: ProductId.create(),
            description:
              ProductDescriptionValueObject.create(
                'valid_description',
              ).getResult(),
            quantity: QuantityInStockValueObject.create(2).getResult(),
            availableStock: QuantityInStockValueObject.create(10).getResult(),
            unitOfMeasurement:
              UnitOfMeasurementValueObject.create('CX').getResult(),
          }).getResult(),
        ],
        images: [ImageValueObject.create(image.imageUrl()).getResult()],
        info: BasketInfoValueObject.create('Information').getResult(),
        comments: [],
      },
      id,
    );
  };

  it('Should create a valid basket', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().description.value).toBe('basket 5 itens');
    expect(createdBasket.getResult().category.description).toBe('mini basket');
    expect(createdBasket.getResult().products?.length).toBe(1);
    expect(createdBasket.getResult().info?.value).toBe('information');
  });

  it('Should create a valid basket with provided id', () => {
    const id = BasketId.create().id;
    const createdBasket = Basket.create(
      {
        description:
          BasketDescriptionValueObject.create('valid_description').getResult(),
        price: MonetaryValueObject.create(
          Currency.create(10).getResult(),
        ).getResult(),
        category: BasketCategory.create({
          changesLimit: 1,
          description: 'valid_desc',
        }).getResult(),
        images: [ImageValueObject.create('https://s3.aws.com').getResult()],
        isActive: true,
      },
      id,
    );
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().id.toString()).toBe(id.toString());
  });

  it('Should update rating', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().numberOfRatings).toBe(0);
    expect(createdBasket.getResult().ratingAverage).toBe(0);
    createdBasket.getResult().rateTheBasket({
      numberOfRatings: 7,
      ratingAverage: 4.8,
    });
    expect(createdBasket.getResult().numberOfRatings).toBe(7);
    expect(createdBasket.getResult().ratingAverage).toBe(4.8);
  });

  it('Should not effect if provide ratingAverage greater than 5', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().numberOfRatings).toBe(0);
    expect(createdBasket.getResult().ratingAverage).toBe(0);
    createdBasket.getResult().rateTheBasket({
      numberOfRatings: 7,
      ratingAverage: 5.8,
    });
    expect(createdBasket.getResult().numberOfRatings).toBe(0);
    expect(createdBasket.getResult().ratingAverage).toBe(0);
  });

  it('Should fail if try create a basket providing a negative price', () => {
    const id = BasketId.create().id;

    const createdBasket = Basket.create(
      {
        description:
          BasketDescriptionValueObject.create('valid_description').getResult(),
        category: BasketCategory.create({
          changesLimit: 1,
          description: 'valid_desc',
        }).getResult(),
        images: [ImageValueObject.create('https://s3.aws.com').getResult()],
        isActive: true,
        price: MonetaryValueObject.create(makePrice(-20)).getResult(),
      },
      id,
    );

    expect(createdBasket.isFailure).toBe(true);
    expect(createdBasket.error).toBe(ERROR_BASKET_PRICE);
  });

  it('Should fail if provide a negative price on change it', () => {
    const createdBasket = makeSut();

    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().price.value).toBe(1);
    const fail = createdBasket
      .getResult()
      .changePrice(MonetaryValueObject.create(makePrice(-11)).getResult());

    expect(fail.isFailure).toBe(true);
    expect(fail.error).toBe(ERROR_BASKET_PRICE);
  });

  it('Should change price with success', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);

    expect(createdBasket.getResult().price.value).toBe(1);

    const fail = createdBasket
      .getResult()
      .changePrice(MonetaryValueObject.create(makePrice(11)).getResult());

    expect(fail.isFailure).toBe(false);
    expect(createdBasket.getResult().price.value).toBe(11);
  });

  it('Should add a new image to basket with success', () => {
    const imageAdd = ImageValueObject.create(
      image.imageUrl(800, 600),
    ).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.images.length).toBe(1);
    createdBasket.addImage(imageAdd);
    expect(createdBasket.images.length).toBe(2);
  });

  it('Should remove an image from a basket with success', () => {
    const imageAdd = ImageValueObject.create(
      image.imageUrl(800, 600),
    ).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.images.length).toBe(1);
    createdBasket.addImage(imageAdd);
    expect(createdBasket.images.length).toBe(2);
    createdBasket.removeImage(imageAdd);
    expect(createdBasket.images.length).toBe(1);
  });

  it('Should deactivate and reactivate a created basket', () => {
    const createdBasket = makeSut().getResult();
    expect(createdBasket.isActive).toBe(true);
    createdBasket.deactivate();
    expect(createdBasket.isActive).toBe(false);
    createdBasket.activate();
    expect(createdBasket.isActive).toBe(true);
  });

  it('Should return empty Array if product has no comment', () => {
    const createdBasket = makeSut().getResult();
    expect(createdBasket.comments).toEqual([]);
  });

  it('Should add comment on created product', () => {
    const createdBasket = makeSut().getResult();
    const comment = Comment.create({
      text: 'Produto muito bom!',
      likes: 2,
    }).getResult();
    createdBasket.addComment(comment);
    expect(createdBasket.comments?.length).toBe(1);
    createdBasket.addComment(comment);
    expect(createdBasket.comments?.length).toBe(2);
  });

  it('Should remove comment on created product', () => {
    const createdBasket = makeSut().getResult();
    const comment1 = Comment.create({
      text: 'Produto de boa qualidade!',
      likes: 1,
    }).getResult();
    const comment2 = Comment.create({
      text: 'Produto muito bom!',
      likes: 2,
    }).getResult();
    createdBasket.addComment(comment1);
    createdBasket.addComment(comment2);
    expect(createdBasket.comments?.length).toBe(2);
    createdBasket.removeComment(comment2);
    expect(createdBasket.comments?.length).toBe(1);
  });

  it('Should not fail if remove an inexisting comment', () => {
    const createdBasket = makeSut().getResult();
    const comment1 = Comment.create({
      text: 'Produto muito bom!',
      likes: 2,
    }).getResult();

    expect(createdBasket.comments.length).toBe(0);
    createdBasket.removeComment(comment1);
    expect(createdBasket.comments.length).toBe(0);
  });

  it('Should add a tag with success', () => {
    const tag = Tag.create({
      description: 'Fresco',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags.length).toBe(0);
    createdBasket.addTag(tag);
    expect(createdBasket.tags.length).toBe(1);
    createdBasket.addTag(tag);
    expect(createdBasket.tags.length).toBe(2);
  });

  it('Should remove a tag with success', () => {
    const tag1 = Tag.create({
      description: 'Orgânico',
    }).getResult();
    const tag2 = Tag.create({
      description: 'Verduras',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags.length).toBe(0);
    createdBasket.addTag(tag1);
    expect(createdBasket.tags.length).toBe(1);
    createdBasket.addTag(tag2);
    expect(createdBasket.tags.length).toBe(2);
    createdBasket.removeTag(tag2);
    expect(createdBasket.tags.length).toBe(1);
  });

  it('Should not fail if try to remove a inexisting tag', () => {
    const tag1 = Tag.create({
      description: 'Orgânico',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags?.length).toBe(0);
    createdBasket.removeTag(tag1);
    expect(createdBasket.tags?.length).toBe(0);
  });

  it('Should add product on a basket', () => {
    const createdBasket = makeSut().getResult();
    const item = BasketItemValueObject.create({
      exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
      productId: ProductId.create(),
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      quantity: QuantityInStockValueObject.create(2).getResult(),
      availableStock: QuantityInStockValueObject.create(10).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
    }).getResult();
    expect(createdBasket.products?.length).toBe(1);

    createdBasket.addProduct(item);
    expect(createdBasket.products?.length).toBe(2);
  });

  it('Should remove product from a basket', () => {
    const productId = ProductId.create();

    const createdBasket = makeSut().getResult();
    const product = BasketItemValueObject.create({
      exchangeFactor: ExchangeFactorValueObject.create(1).getResult(),
      productId,
      description:
        ProductDescriptionValueObject.create('valid_description').getResult(),
      quantity: QuantityInStockValueObject.create(2).getResult(),
      availableStock: QuantityInStockValueObject.create(10).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create('CX').getResult(),
    }).getResult();

    expect(createdBasket.products?.length).toBe(1);
    createdBasket.addProduct(product);
    expect(createdBasket.products?.length).toBe(2);
    createdBasket.removeProduct(productId);
    expect(createdBasket.products?.length).toBe(1);
  });

  it('should add comment on basket', () => {
    const commentId = CommentId.create();

    const basket = Basket.create({
      category: BasketCategory.create({
        changesLimit: 2,
        description: 'valid_description',
      }).getResult(),
      description:
        BasketDescriptionValueObject.create('valid_description').getResult(),
      isActive: true,
      price: MonetaryValueObject.create(
        Currency.create(20).getResult(),
      ).getResult(),
    }).getResult();

    const commentsLength = basket.comments.length;
    expect(commentsLength).toBe(0);
    basket.addComment(commentId);
    const oneCommentLength = basket.comments.length;
    expect(oneCommentLength).toBe(1);
  });
});
