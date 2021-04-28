import { IsEmail, Length } from 'class-validator';

export class SignInDto {
  @IsEmail()
  email!: string;

  @Length(5, 15)
  password!: string;
}
