import { image, random } from 'faker';
import { Result, UniqueEntityID } from 'types-ddd';
import { Comment, ProductCategory, Tag } from '@domain/entities';
import {
  ImageValueObject,
  MonetaryValueObject,
  Currency,
} from '@domain/value-objects';
import { Product } from './Product.domain-aggregate-root';
import { ProductProps } from './Product.domain-aggregate-root-interface';
import {
  ERROR_PRODUCT_AVAILABLE_QUANTITY as ERROR_PRODUCT_AVAILABLE_QUANTITY,
  ERROR_PRODUCT_DESCRIPTION_LENGTH,
  ERROR_PRODUCT_PRICE,
} from './ProductErrors.domain-aggregate-root';
import { ProductId } from './ProductId.domain-aggregate-root';

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
        description: props?.description ?? 'Maçã Brasileira',
        category:
          props?.category ??
          ProductCategory.create({ description: 'Frutas' }).getResult(),
        info:
          props?.info ??
          'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
        isActive: props?.isActive ?? true,
        isSpecial: props?.isSpecial ?? false,
        price:
          props?.price ??
          MonetaryValueObject.create(makeCurrency(10)).getResult(),
        quantityAvailable: props?.quantityAvailable ?? 10,
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
    expect(createdProduct.getResult().description).toBe('Maçã Brasileira');
    expect(createdProduct.getResult().category.description).toBe('frutas');
    expect(createdProduct.getResult().info).toBe(
      'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
    );
    expect(createdProduct.getResult().isActive).toBe(true);
    expect(createdProduct.getResult().isSpecial).toBe(false);
    expect(createdProduct.getResult().price.value).toBe(10);
    expect(createdProduct.getResult().images?.value).toBeDefined();
  });

  it('Should fail if provide a long description to update', () => {
    const createdProduct = makeSut();
    const fail = createdProduct.getResult().changeDescription(random.words(20));
    expect(fail.isFailure).toBe(true);
    expect(fail.error).toBe(ERROR_PRODUCT_DESCRIPTION_LENGTH);
  });

  it('Should change a description with success', () => {
    const createdProduct = makeSut();
    const change = createdProduct
      .getResult()
      .changeDescription('Valid description');
    expect(change.isFailure).toBe(false);
    expect(createdProduct.getResult().description).toBe('Valid description');
  });

  it('Should fail if provide a long description to create', () => {
    const createdProductCustom = Product.create({
      description: String('invalid_long_description').repeat(50),
      category: ProductCategory.create({ description: 'Frutas' }).getResult(),
      info:
        'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makeCurrency(10)).getResult(),
      quantityAvailable: 10,
      image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
    });

    expect(createdProductCustom.isFailure).toBe(true);
    expect(createdProductCustom.error).toBe(ERROR_PRODUCT_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a negative number as available quantity', () => {
    const createdProductCustom = Product.create({
      description: 'Maçã Brasileira',
      category: ProductCategory.create({ description: 'Frutas' }).getResult(),
      info:
        'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makeCurrency(10)).getResult(),
      quantityAvailable: -1,
      image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
    });
    expect(createdProductCustom.isFailure).toBe(true);
    expect(createdProductCustom.error).toBe(ERROR_PRODUCT_AVAILABLE_QUANTITY);
  });

  it('Should fail if provide a negative number as price', () => {
    const product = Product.create({
      description: 'Maçã Brasileira',
      category: ProductCategory.create({ description: 'Frutas' }).getResult(),
      info:
        'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makeCurrency(-10)).getResult(),
      quantityAvailable: 2,
      image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
    });

    expect(product.error).toBe(ERROR_PRODUCT_PRICE);
    expect(product.isFailure).toBe(true);
  });

  it('Should add an image to product with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.images?.value).toBeDefined();
    createdProduct.changeImage(
      ImageValueObject.create(image.imageUrl()).getResult(),
    );
    expect(createdProduct.images?.value).toBeDefined();
  });

  it('Should remove an image from a product with success', () => {
    const createdProduct = makeSut().getResult();
    const imageAdd = ImageValueObject.create(
      image.imageUrl(80, 80),
    ).getResult();
    expect(createdProduct.images?.value).toBeDefined();
    createdProduct.changeImage(imageAdd);
    expect(createdProduct.images?.value).toBeDefined();
    createdProduct.removeImage(imageAdd);
    expect(createdProduct.images?.value).not.toBeDefined();
  });

  it('Should launch stock with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.quantityAvaliable).toBe(10);
    createdProduct.launchStock(200);
    expect(createdProduct.quantityAvaliable).toBe(200);
  });

  it('Should fail if provide a negative value to launch stock', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.quantityAvaliable).toBe(10);
    createdProduct.launchStock(-1);
    expect(createdProduct.quantityAvaliable).toBe(10);
  });

  it('Should increment stock with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.quantityAvaliable).toBe(10);
    createdProduct.incrementStock();
    expect(createdProduct.quantityAvaliable).toBe(11);
  });

  it('Should decrement stock with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.quantityAvaliable).toBe(10);
    createdProduct.decrementStock();
    expect(createdProduct.quantityAvaliable).toBe(9);
  });

  it('Should fail if decrement stock until negative value', () => {
    const product = Product.create({
      description: 'Maçã Brasileira',
      category: ProductCategory.create({ description: 'Frutas' }).getResult(),
      info:
        'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
      isActive: true,
      isSpecial: false,
      price: MonetaryValueObject.create(makeCurrency(10)).getResult(),
      quantityAvailable: 1,
      image: ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
    }).getResult();

    expect(product.quantityAvaliable).toBe(1);
    product.decrementStock();
    expect(product.quantityAvaliable).toBe(0);
    product.decrementStock();
    expect(product.quantityAvaliable).toBe(0);
  });

  it('Should create a product with provided id', () => {
    const id = ProductId.create().id;
    const product = Product.create(
      {
        description: 'Maçã Brasileira',
        category: ProductCategory.create({ description: 'Frutas' }).getResult(),
        info:
          'Maçã Brasileira produzida no sul de Santa Catariana e cultivada com carinho',
        isActive: true,
        isSpecial: false,
        price: MonetaryValueObject.create(makeCurrency(10)).getResult(),
        quantityAvailable: 1,
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
    expect(createdProduct.comments?.length).toBe(undefined);
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
    expect(createdProduct.comments?.length).toBe(undefined);
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
    expect(createdProduct.comments?.length).toBe(undefined);
    createdProduct.removeComment(comment);
    expect(createdProduct.comments?.length).toBe(undefined);
  });

  it('Should not add a existing tag', () => {
    const tag = Tag.create({
      description: 'Fresco',
    }).getResult();
    const createdProduct = makeSut().getResult();
    expect(createdProduct.tags?.length).toBe(undefined);
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
    expect(createdProduct.tags?.length).toBe(undefined);
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
    expect(createdProduct.tags?.length).toBe(undefined);
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
    expect(createdProduct.tags?.length).toBe(undefined);
    createdProduct.removeTag(tag);
    expect(createdProduct.tags?.length).toBe(undefined);
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
