import { IsString, Length } from 'class-validator';
import {
  MAX_TAG_DESCRIPTION_LENGTH,
  MIN_TAG_DESCRIPTION_LENGTH,
} from '@domain/entities';

export class RegisterTagDto {
  @IsString()
  @Length(MIN_TAG_DESCRIPTION_LENGTH, MAX_TAG_DESCRIPTION_LENGTH)
  description!: string;
}
