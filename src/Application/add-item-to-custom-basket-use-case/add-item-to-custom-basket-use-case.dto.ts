export interface AddItemToCustomBasketDto {
  productId: string;
  basketId: string;
  clientId: string;
  quantityOfItemToAdd: number;
}
