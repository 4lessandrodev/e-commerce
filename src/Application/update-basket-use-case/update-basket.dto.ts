export interface UpdateBasketDto {
	basketId: string;
	description: string;
	price: number;
	isActive: boolean;
	info?: string;
}
