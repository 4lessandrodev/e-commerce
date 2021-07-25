import { IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator';

export class DefineEcobagPriceDto {
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	@Max(50)
	price!: number;
}
