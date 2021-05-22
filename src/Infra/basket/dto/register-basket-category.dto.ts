import { IsPositive, IsString, Length, Max, Min } from 'class-validator';
import {
  MIN_BASKET_CATEGORY_DESCRIPTION_LENGTH,
  MAX_BASKET_CATEGORY_DESCRIPTION_LENGTH,
} from '@domain/entities';
import { MAX_CHANGES_LIMIT_VALUE } from '@domain/value-objects';

export class RegisterBasketCategoryDto {
  @IsString()
  @Length(
    MIN_BASKET_CATEGORY_DESCRIPTION_LENGTH,
    MAX_BASKET_CATEGORY_DESCRIPTION_LENGTH,
  )
  description!: string;

  @IsPositive()
  @Max(MAX_CHANGES_LIMIT_VALUE)
  @Min(1)
  changesLimit!: number;
}
