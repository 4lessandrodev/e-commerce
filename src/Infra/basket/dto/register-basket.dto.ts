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

export class ItemDto {
  @IsPositive()
  @Max(10)
  exchangeFactor!: number;

  @IsUUID('4')
  productId!: string;

  @IsPositive()
  @Max(1000)
  quantity!: number;
}

export class RegisterBasketDto {
  @IsString()
  @Length(3, 20)
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
  @MaxLength(250)
  info?: string;

  @IsOptional()
  @IsUUID('4', { each: true })
  tagsIds?: string[];
}
