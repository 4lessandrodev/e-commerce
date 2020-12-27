import { image, random } from 'faker';
import { Result, UniqueEntityID } from '../../../Shared';
import { Comment, ProductCategory } from '../../entities';
import { ImageValueObject, MonetaryValueObject } from '../../value-objects';
import { Product } from './Product.domain-aggregate-root';
import { ProductProps } from './Product.domain-aggregate-root-interface';
import {
  ERROR_PRODUCT_AVALIABLE_QUANTITY,
  ERROR_PRODUCT_DESCRIPTION_LENGTH,
  ERROR_PRODUCT_PRICE,
} from './ProductErrors.domain-aggregate-root';
import { ProductId } from './ProductId.domain-aggregate-root';

describe('Product.domain-aggregate-root', () => {
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
        price: props?.price ?? MonetaryValueObject.create(10).getResult(),
        quantityAvaliable: props?.quantityAvaliable ?? 10,
        images: props?.images ?? [
          ImageValueObject.create(image.imageUrl(200, 450)).getResult(),
          ImageValueObject.create(image.imageUrl(400, 600)).getResult(),
          ImageValueObject.create(image.imageUrl(800, 1020)).getResult(),
        ],
      },
      id,
    );
  };

  it('Should create a valid product', () => {
    const createdProduct = makeSut();
    expect(createdProduct.isFailure).toBe(false);
  });

  it('Should fail if provide a long description to update', () => {
    const createdProduct = makeSut();
    const fail = createdProduct.getResult().changeDescription(random.words(20));
    expect(fail.isFailure).toBe(true);
    expect(fail.error).toBe(ERROR_PRODUCT_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a long description to create', () => {
    const createdProduct = makeSut().getResult();
    const createdProductCustom = makeSut({
      ...createdProduct.props,
      description: random.words(20),
    });
    expect(createdProductCustom.isFailure).toBe(true);
    expect(createdProductCustom.error).toBe(ERROR_PRODUCT_DESCRIPTION_LENGTH);
  });

  it('Should fail if provide a negative number as avaliable quantity', () => {
    const createdProduct = makeSut().getResult();
    const createdProductCustom = makeSut({
      ...createdProduct.props,
      quantityAvaliable: -1,
    });
    expect(createdProductCustom.isFailure).toBe(true);
    expect(createdProductCustom.error).toBe(ERROR_PRODUCT_AVALIABLE_QUANTITY);
  });

  it('Should fail if provide a negative number as price', () => {
    const invalidPrice = MonetaryValueObject.create(-3).getResult();
    const createdProduct = makeSut().getResult();
    const createdProductCustom = makeSut({
      ...createdProduct.props,
      price: invalidPrice,
    });
    expect(createdProductCustom.isFailure).toBe(true);
    expect(createdProductCustom.error).toBe(ERROR_PRODUCT_PRICE);
  });

  it('Should add an image to product with success', () => {
    const createdProduct = makeSut().getResult();
    expect(createdProduct.images.length).toBe(3);
    createdProduct.addImage(
      ImageValueObject.create(image.imageUrl()).getResult(),
    );
    expect(createdProduct.images.length).toBe(4);
  });

  it('Should remove an image from a product with success', () => {
    const createdProduct = makeSut().getResult();
    const imageAdd = ImageValueObject.create(
      image.imageUrl(80, 80),
    ).getResult();
    expect(createdProduct.images.length).toBe(3);
    createdProduct.addImage(imageAdd);
    expect(createdProduct.images.length).toBe(4);
    createdProduct.removeImage(imageAdd);
    expect(createdProduct.images.length).toBe(3);
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
    const createdProduct = makeSut().getResult();
    const createdProductCustom = makeSut({
      ...createdProduct.props,
      quantityAvaliable: 1,
    }).getResult();
    expect(createdProductCustom.quantityAvaliable).toBe(1);
    createdProductCustom.decrementStock();
    expect(createdProductCustom.quantityAvaliable).toBe(0);
    createdProductCustom.decrementStock();
    expect(createdProductCustom.quantityAvaliable).toBe(0);
  });

  it('Should create a product with provided id', () => {
    const createdProduct = makeSut().getResult();
    const id = ProductId.create().id;
    const createdProductCustom = makeSut(
      {
        ...createdProduct.props,
      },
      id,
    ).getResult();
    expect(createdProductCustom.id.toString()).toBe(id.toString());
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
});
