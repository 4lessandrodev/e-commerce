import { IsString } from 'class-validator';

export class RegisterTagDto {
  @IsString()
  description!: string;
}
