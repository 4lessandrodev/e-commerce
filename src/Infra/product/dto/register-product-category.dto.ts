import { IsString, Length } from 'class-validator';

export class RegisterProductCategoryDto {
  @IsString()
  @Length(3, 20)
  description!: string;
}
