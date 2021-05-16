import { image } from 'faker';
import { Result, UniqueEntityID } from 'types-ddd';
import { Comment, ProductCategory, Tag } from '@domain/entities';
import {
  ImageValueObject,
  MonetaryValueObject,
  Currency,
  ProductDescriptionValueObject,
  ExchangeFactorValueObject,
  ProductInfoValueObject,
  QuantityInStockValueObject,
} from '@domain/value-objects';
import { Product } from './product.domain-aggregate-root';
import { ProductProps } from './product.domain-aggregate-root-interface';
import { ERROR_PRODUCT_PRICE } from './product-errors.domain-aggregate-root';
import { ProductId } from './product-id.domain-aggregate-root';
import { UnitOfMeasurementValueObject } from '@domain/value-objects/unit-of-measurement/unit-of-measurement.value-objects';

describe('Product.domain-aggregate-root', () => {
  const makeCurrency = (value: number): Currency => {
    return Currency.create({
      locale: 'pt-BR',
      symbol: 'BRL',
      value,
    }).getResult();
  };

  const makeSut = (
    props?: ProductProps,
    id?: UniqueEntityID,
  ): Result<Product> => {
    return Product.create(
      {
        exchangeFactor:
          props?.exchangeFactor ??
          ExchangeFactorValueObject.create(2).getResult(),
        description:
          props?.description ??
          ProductDescriptionValueObject.create('Maçã Brasileira').getResult(),
        unitOfMeasurement:
          props?.unitOfMeasurement ??
          UnitOfMeasurementValueObject.create('UN').getResult(),
        category:
          props?.category ??
          ProductCategory.create({ description: 'Frutas' }).getResult(),
        info:
          props?.info ??
          ProductInfoValueObject.create(
            'Maçã brasileira produzida no sul de santa catariana e cultivada com carinho',
          ).getResult(),
        isActive: props?.isActive ?? true,
        isSpecial: props?.isSpecial ?? false,
        price:
          props?.price ??
          MonetaryValueObject.create(makeCurrency(10)).getResult(),
        quantityAvailable:
          props?.quantityAvailable ??
          QuantityInStockValueObject.create(10).getResult(),
        image:
          props?.image ??
          ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
      },
      id,
    );
  };

  it('Should create a valid product', () => {
    const createdProduct = makeSut();
    expect(createdProduct.isFailure).toBe(false);
    expect(createdProduct.getResult().description.value).toBe(
      'maçã brasileira',
    );
    expect(createdProduct.getResult().category.description).toBe('frutas');
    expect(createdProduct.getResult().info?.value).toBe(
      'maçã brasileira produzida no sul de santa catariana e cultivada com carinho',
    );
    expect(createdProduct.getResult().isActive).toBe(true);
    expect(createdProduct.getResult().isSpecial).toBe(false);
    expect(createdProduct.getResult().price.value).toBe(10);
    expect(createdProduct.getResult().image?.value).toBeDefined();
  });

  it('Should change a description with success', () => {
    const createdProduct = makeSut();
    const newDescription = ProductDescriptionValueObject.create(
      'new valid description',
    ).getResult();
    const change = createdProduct.getResult().changeDescription(newDescription);
    expect(change.isFailure).toBe(false);
    expect(createdProduct.getResult().description.value).toBe(
      'new valid description',
    );
  });

  it('Should fail if provide a negative number as price', () => {
    const product = Product.create({
      description:
        ProductDescriptionValueObject.create('Maçã Brasileira').getResult(),
      quantityAvailable: QuantityInStockValueObject.create(2).getResult(),
      exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
      category: ProductCategory.create({ description: 'Frutas' }).getResult(),
      unitOfMeasurement: UnitOfMeasurementValueObject.create('KG').getResult(),
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makeCurrency(-10)).getResult(),
      image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
    });

    expect(product.error).toBe(ERROR_PRODUCT_PRICE);
    expect(product.isFailure).toBe(true);
  });

  it('Should add an image to product with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.image?.value).toBeDefined();
    createdProduct.changeImage(
      ImageValueObject.create(image.imageUrl()).getResult(),
    );
    expect(createdProduct.image?.value).toBeDefined();
  });

  it('Should remove an image from a product with success', () => {
    const createdProduct = makeSut().getResult();
    const imageAdd = ImageValueObject.create(
      image.imageUrl(80, 80),
    ).getResult();
    expect(createdProduct.image?.value).toBeDefined();
    createdProduct.changeImage(imageAdd);
    expect(createdProduct.image?.value).toBeDefined();
    createdProduct.removeImage();
    expect(createdProduct.image?.value).not.toBeDefined();
  });

  it('Should launch stock with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.quantityAvailable.value).toBe(10);
    createdProduct.launchStock(
      QuantityInStockValueObject.create(200).getResult(),
    );
    expect(createdProduct.quantityAvailable.value).toBe(200);
  });

  it('Should create a product with provided id', () => {
    const id = ProductId.create().id;
    const product = Product.create(
      {
        description:
          ProductDescriptionValueObject.create('Maçã Brasileira').getResult(),
        quantityAvailable: QuantityInStockValueObject.create(2).getResult(),
        exchangeFactor: ExchangeFactorValueObject.create(2).getResult(),
        category: ProductCategory.create({ description: 'Frutas' }).getResult(),
        unitOfMeasurement:
          UnitOfMeasurementValueObject.create('KG').getResult(),
        isActive: true,
        isSpecial: false,
        price: MonetaryValueObject.create(makeCurrency(10)).getResult(),
        image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
      },
      id,
    ).getResult();
    expect(product.id.toString()).toBe(id.toString());
  });

  it('Should deactivate and reactivate a product with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.isActive).toBe(true);
    createdProduct.deactivate();
    expect(createdProduct.isActive).toBe(false);
    createdProduct.activate();
    expect(createdProduct.isActive).toBe(true);
  });

  it('Should rating a product with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.ratingAverage).toBe(0);
    expect(createdProduct.numberOfRatings).toBe(0);
    createdProduct.updateProductRating({
      numberOfRatings: 11,
      ratingAverage: 3.8,
    });
    expect(createdProduct.ratingAverage).toBe(3.8);
    expect(createdProduct.numberOfRatings).toBe(11);
  });

  it('Should not effect if provide a rating average greatter than 5', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.ratingAverage).toBe(0);
    expect(createdProduct.numberOfRatings).toBe(0);
    createdProduct.updateProductRating({
      numberOfRatings: 11,
      ratingAverage: 7.1,
    });
    expect(createdProduct.ratingAverage).toBe(0);
    expect(createdProduct.numberOfRatings).toBe(0);
  });

  it('Should add a comment with success', () => {
    const comment = Comment.create({
      text: 'Produto bacana esse!',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.comments?.length).toBe(0);
    createdProduct.addComment(comment);
    expect(createdProduct.comments?.length).toBe(1);
    createdProduct.addComment(comment);
    expect(createdProduct.comments?.length).toBe(2);
  });

  it('Should remove a comment with success', () => {
    const comment1 = Comment.create({
      text: 'Produto bacana esse!',
    }).getResult();
    const comment2 = Comment.create({
      text: 'Eu recomendo esse produto!',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.comments?.length).toBe(0);
    createdProduct.addComment(comment1);
    expect(createdProduct.comments?.length).toBe(1);
    createdProduct.addComment(comment2);
    expect(createdProduct.comments?.length).toBe(2);
    createdProduct.removeComment(comment2);
    expect(createdProduct.comments?.length).toBe(1);
  });

  it('Should not effect on try remove a inexsting comment', () => {
    const comment = Comment.create({
      text: 'Produto bacana esse!',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.comments?.length).toBe(0);
    createdProduct.removeComment(comment);
    expect(createdProduct.comments?.length).toBe(0);
  });

  it('Should not add a existing tag', () => {
    const tag = Tag.create({
      description: 'Fresco',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.tags?.length).toBe(0);
    createdProduct.addTag(tag);
    expect(createdProduct.tags?.length).toBe(1);
    createdProduct.addTag(tag);
    expect(createdProduct.tags?.length).toBe(1);
  });

  it('Should add a different provided tag', () => {
    const tag1 = Tag.create({
      description: 'Fresco',
    }).getResult();

    const tag2 = Tag.create({
      description: 'Verdura',
    }).getResult();

    const createdProduct = makeSut().getResult();
    expect(createdProduct.tags?.length).toBe(0);
    createdProduct.addTag(tag1);
    expect(createdProduct.tags?.length).toBe(1);
    createdProduct.addTag(tag2);
    expect(createdProduct.tags?.length).toBe(2);
  });

  it('Should remove a tag with success', () => {
    const tag1 = Tag.create({
      description: 'Orgânico',
    }).getResult();
    const tag2 = Tag.create({
      description: 'Verduras',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.tags?.length).toBe(0);
    createdProduct.addTag(tag1);
    expect(createdProduct.tags?.length).toBe(1);
    createdProduct.addTag(tag2);
    expect(createdProduct.tags?.length).toBe(2);
    createdProduct.removeTag(tag2);
    expect(createdProduct.tags?.length).toBe(1);
  });

  it('Should not effect on try to remove a inexisting tag', () => {
    const tag = Tag.create({
      description: 'Orgânico',
    }).getResult();

    const createdProduct = makeSut().getResult();
    expect(createdProduct.tags?.length).toBe(0);
    createdProduct.removeTag(tag);
    expect(createdProduct.tags?.length).toBe(0);
  });

  it('Should change price with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.price.value).toBe(10);
    const validPrice = MonetaryValueObject.create(makeCurrency(5)).getResult();
    createdProduct.changePrice(validPrice);
    expect(createdProduct.price.value).toBe(5);
  });

  it('Should fail if provide a negative price to change it', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.price.value).toBe(10);
    const validPrice = MonetaryValueObject.create(makeCurrency(5)).getResult();
    createdProduct.changePrice(validPrice);
    expect(createdProduct.price.value).toBe(5);
  });
});
