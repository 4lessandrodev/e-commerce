import { IsPositive, IsString, Length, Max, Min } from 'class-validator';

export class RegisterBasketCategoryDto {
  @IsString()
  @Length(3, 20)
  description!: string;

  @IsPositive()
  @Max(20)
  @Min(1)
  changesLimit!: number;
}
