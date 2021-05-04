import { image, random } from 'faker';
import { Result, UniqueEntityID } from 'types-ddd';
import { Basket } from '..';
import {
  BasketCategory,
  Comment,
  ProductCategory,
  Tag,
} from '@domain/entities';
import { ImageValueObject, MonetaryValueObject } from '@domain/value-objects';
import { Currency } from '@domain/value-objects/monetary/Currency.value-object';
import { Product } from '../product/Product.domain-aggregate-root';
import { BasketProps } from './Basket.domain-aggregate-root-interface';
import {
  ERROR_BASKET_DESCRIPTION_LENGTH,
  ERROR_BASKET_PRICE,
} from './BasketErrors.domain-aggregate-root';
import { BasketId } from './BasketId.domain-aggregate-root';

describe('Basket.domain-aggregate-root', () => {
  const makePrice = (value: number): Currency => {
    return Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value,
    }).getResult();
  };
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
        price:
          props?.price ?? MonetaryValueObject.create(makePrice(1)).getResult(),
        products: props?.products ?? [
          Product.create({
            description: 'Abacaxi',
            category: ProductCategory.create({
              description: 'Frutas',
            }).getResult(),
            image: ImageValueObject.create(image.imageUrl()).getResult(),
            isActive: true,
            isSpecial: false,
            price: MonetaryValueObject.create(
              Currency.create({
                locale: 'pt-BR',
                symbol: 'BRL',
                value: 15,
              }).getResult(),
            ).getResult(),
            quantityAvailable: 20,
          }).getResult(),
        ],
        images: [ImageValueObject.create(image.imageUrl()).getResult()],
        info: 'Information',
      },
      id,
    );
  };

  it('Should create a valid basket', () => {
    const createdBasket = makeSut();
    expect(createdBasket.isFailure).toBe(false);
    expect(createdBasket.getResult().description).toBe('Basket 5 itens');
    expect(createdBasket.getResult().category.description).toBe('Mini Basket');
    expect(createdBasket.getResult().products?.length).toBe(1);
    expect(createdBasket.getResult().info).toBe('Information');
  });

  it('Should fail if provide a long description to basket', () => {
    const failBasket = makeSut({
      description: random.words(20),
      price: MonetaryValueObject.create(
        Currency.create({
          locale: 'pt-BR',
          symbol: 'BRL',
          value: 10,
        }).getResult(),
      ).getResult(),
      category: BasketCategory.create({
        changesLimit: 1,
        description: 'valid_desc',
      }).getResult(),
      images: [ImageValueObject.create('https://s3.aws.com').getResult()],
      isActive: true,
    });
    expect(failBasket.isFailure).toBe(true);
    expect(failBasket.error).toBe(ERROR_BASKET_DESCRIPTION_LENGTH);
  });

  it('Should create a valid basket with provided id', () => {
    const id = BasketId.create().id;
    const createdBasket = Basket.create(
      {
        description: 'valid_description',
        price: MonetaryValueObject.create(
          Currency.create({
            locale: 'pt-BR',
            symbol: 'BRL',
            value: 10,
          }).getResult(),
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

  it('Should not effect if provide ratingAverage greatter than 5', () => {
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
        description: 'valid_description',
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

  it('Should add a tag with success', () => {
    const tag = Tag.create({
      description: 'Fresco',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags?.length).toBe(undefined);
    createdBasket.addTag(tag);
    expect(createdBasket.tags?.length).toBe(1);
    createdBasket.addTag(tag);
    expect(createdBasket.tags?.length).toBe(2);
  });

  it('Should remove a tag with success', () => {
    const tag1 = Tag.create({
      description: 'Orgânico',
    }).getResult();
    const tag2 = Tag.create({
      description: 'Verduras',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags?.length).toBe(undefined);
    createdBasket.addTag(tag1);
    expect(createdBasket.tags?.length).toBe(1);
    createdBasket.addTag(tag2);
    expect(createdBasket.tags?.length).toBe(2);
    createdBasket.removeTag(tag2);
    expect(createdBasket.tags?.length).toBe(1);
  });

  it('Should not fail if try to remove a inexisting tag', () => {
    const tag1 = Tag.create({
      description: 'Orgânico',
    }).getResult();
    const createdBasket = makeSut().getResult();
    expect(createdBasket.tags?.length).toBe(undefined);
    createdBasket.removeTag(tag1);
    expect(createdBasket.tags?.length).toBe(undefined);
  });

  it('Should add product on a basket', () => {
    const createdBasket = makeSut().getResult();
    const product = Product.create({
      description: 'Valid Product',
      category: ProductCategory.create({
        description: 'Valid Category',
      }).getResult(),
      image: ImageValueObject.create(image.imageUrl()).getResult(),
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makePrice(15)).getResult(),
      quantityAvailable: 15,
    }).getResult();
    expect(createdBasket.products?.length).toBe(1);
    createdBasket.addProduct(product);
    expect(createdBasket.products?.length).toBe(2);
  });

  it('Should remove product from a basket', () => {
    const createdBasket = makeSut().getResult();
    const product = Product.create({
      description: 'Valid Product',
      category: ProductCategory.create({
        description: 'Valid Category',
      }).getResult(),
      image: ImageValueObject.create(image.imageUrl()).getResult(),
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makePrice(15)).getResult(),
      quantityAvailable: 15,
    }).getResult();
    expect(createdBasket.products?.length).toBe(1);
    createdBasket.addProduct(product);
    expect(createdBasket.products?.length).toBe(2);
    createdBasket.removeProduct(product);
    expect(createdBasket.products?.length).toBe(1);
  });
});
