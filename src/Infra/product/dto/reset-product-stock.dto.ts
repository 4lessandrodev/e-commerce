import { IsOptional, IsUUID } from 'class-validator';

export class ResetProductStockDto {
	@IsOptional()
	@IsUUID('4', { each: true })
	productsIds?: string[];
}
