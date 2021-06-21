/**
 * @param productId refer to Item user wants to add on custom basket
 * @param basketId refer to original basket
 * @param clientId refer to userId on session
 * @param quantityOfItemToAdd quantity of product to add on custom basket
 * @param customBasketId  If Its the first item to add on custom basket it does not exist
 */
export interface AddItemToCustomBasketDto {
	productId: string;
	basketId: string;
	clientId: string;
	quantityOfItemToAdd: number;
	customBasketId?: string;
}
