import { IsBoolean, IsEmail, IsNotEmpty, Length } from 'class-validator';
import { Term } from '../entities/user.schema';

export class SignUpDto {
  term!: Term;

  @IsEmail()
  email!: string;

  @Length(5, 15)
  password!: string;

  @IsBoolean()
  @IsNotEmpty()
  acceptedTerm!: boolean;
}
