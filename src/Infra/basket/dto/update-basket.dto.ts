import { IsBoolean, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { IsString, Length, MaxLength } from 'class-validator';
import { MAX_BASKET_INFO_LENGTH } from '@domain/value-objects';
import { MIN_BASKET_DESCRIPTION_LENGTH } from '@domain/value-objects';
import { MAX_BASKET_DESCRIPTION_LENGTH } from '@domain/value-objects';

export class UpdateBasketDto {
  basketId!: string;

  @IsString()
  @Length(MIN_BASKET_DESCRIPTION_LENGTH, MAX_BASKET_DESCRIPTION_LENGTH)
  description!: string;

  @IsPositive()
  price!: number;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @MaxLength(MAX_BASKET_INFO_LENGTH)
  info?: string;
}

export class BasketId {
  @IsUUID('4')
  id!: string;
}
