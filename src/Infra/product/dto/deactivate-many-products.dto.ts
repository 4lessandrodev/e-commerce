import { IsOptional, IsUUID } from 'class-validator';

export class DeactivateManyProductsDto {
	@IsOptional()
	@IsUUID('4', { each: true })
	productsIds?: string[];
}
