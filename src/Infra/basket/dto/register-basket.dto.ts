import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import {
  IsBoolean,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  Length,
  Max,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { MAX_EXCHANGE_FACTOR } from '@domain/value-objects';
import {
  MAX_BASKET_DESCRIPTION_LENGTH,
  MAX_BASKET_INFO_LENGTH,
  MIN_BASKET_DESCRIPTION_LENGTH,
} from '@domain/aggregates-root';

export class ItemDto {
  @IsPositive()
  @Max(MAX_EXCHANGE_FACTOR)
  exchangeFactor!: number;

  @IsUUID('4')
  productId!: string;

  @IsPositive()
  @Max(1000)
  quantity!: number;
}

export class RegisterBasketDto {
  @IsString()
  @Length(MIN_BASKET_DESCRIPTION_LENGTH, MAX_BASKET_DESCRIPTION_LENGTH)
  description!: string;

  @IsUUID()
  categoryId!: string;

  @IsPositive()
  price!: number;

  @IsBoolean()
  isActive!: boolean;

  images?: File;

  @IsOptional()
  @IsObject({ each: true })
  @ValidateNested()
  items?: ItemDto[];

  @IsOptional()
  @MaxLength(MAX_BASKET_INFO_LENGTH)
  info?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tagsIds?: string[];
}
