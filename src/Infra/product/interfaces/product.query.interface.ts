import { Product } from '../entities/product.schema';
import { ProductFilter } from './product.filters.interface';

export interface PageInfo {
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	totalOfRegisters: number;
}
export interface GetProductsPayload {
	pageInfo: PageInfo;
	products: Product[];
}
export interface ProductQueryInterface {
	getProducts: (filter: ProductFilter) => Promise<GetProductsPayload>;
}
