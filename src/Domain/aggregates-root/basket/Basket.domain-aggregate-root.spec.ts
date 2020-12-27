import { image, random } from 'faker';
import { Basket } from '..';
import { Result, UniqueEntityID } from '../../../Shared';
import { BasketCategory, Comment, ProductCategory } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { Product } from '../product/Product.domain-aggregate-root';
import { BasketProps } from './Basket.domain-aggregate-root-interface';
import {
  ERROR_BASKET_DESCRIPTION_LENGTH,
  ERROR_BASKET_PRICE,
} from './BasketErrors.domain-aggregate-root';
import { BasketId } from './BasketId.domain-aggregate-root';

describe('Basket.domain-aggregate-root', () => {
  const makeSut = (
    props?: BasketProps,
    id?: UniqueEntityID,
  ): Result<Basket> => {
    return Basket.create(
      {
        description: props?.description ?? 'Basket 5 itens',
        category:
          props?.category ??
          BasketCategory.create({
            changesLimit: 3,
            description: 'Mini Basket',
          }).getResult(),
        isActive: props?.isActive ?? true,
        price: props?.price ?? MonetaryValueObject.create(20).getResult(),
        products: props?.products ?? [
          Product.create({
            description: 'Abacaxi',
            category: ProductCategory.create({
              description: 'Frutas',
            }).getResult(),
            images: [ImageValueObject.create(image.imageUrl()).getResult()],
            isActive: true,
            isSpecial: false,
            price: MonetaryValueObject.create(1).getResult(),
            quantityAvaliable: 20,
          }).getResult(),
        ],
        images: [ImageValueObject.create(image.imageUrl()).getResult()],
      },
      id,
    );
  };

  it('Should create a valid basket', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
  });

  it('Should fail if provide a long description to basket', () => {
    const props = makeSut().getResult().props;
    const failBasket = makeSut({
      ...props,
      description: random.words(20),
    });
    expect(failBasket.isFailure).toBe(true);
    expect(failBasket.error).toBe(ERROR_BASKET_DESCRIPTION_LENGTH);
  });

  it('Should create a valid basket with provided id', () => {
    const props = makeSut().getResult().props;
    const id = BasketId.create().id;
    const createdBasket = makeSut(
      {
        ...props,
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
    createdBasket.getResult().updateBasketRating({
      numberOfRatings: 7,
      ratingAverage: 4.8,
    });
    expect(createdBasket.getResult().numberOfRatings).toBe(7);
    expect(createdBasket.getResult().ratingAverage).toBe(4.8);
  });

  it('Should not effect if provide ratingAverage greatter than 5', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().numberOfRatings).toBe(0);
    expect(createdBasket.getResult().ratingAverage).toBe(0);
    createdBasket.getResult().updateBasketRating({
      numberOfRatings: 7,
      ratingAverage: 5.8,
    });
    expect(createdBasket.getResult().numberOfRatings).toBe(0);
    expect(createdBasket.getResult().ratingAverage).toBe(0);
  });

  it('Should fail if provide a negative price on change it', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().price.value).toBe(20);
    const fail = createdBasket
      .getResult()
      .changePrice(MonetaryValueObject.create(-1).getResult());
    expect(fail.isFailure).toBe(true);
    expect(fail.error).toBe(ERROR_BASKET_PRICE);
  });

  it('Should change price with success', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().price.value).toBe(20);
    const fail = createdBasket
      .getResult()
      .changePrice(MonetaryValueObject.create(11).getResult());
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

  it('Should return null if product has no comment', () => {
    const createdBasket = makeSut().getResult();
    expect(createdBasket.comments).toBe(null);
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

    expect(createdBasket.comments?.length).toBe(undefined);
    createdBasket.removeComment(comment1);
    expect(createdBasket.comments?.length).toBe(undefined);
  });
});
