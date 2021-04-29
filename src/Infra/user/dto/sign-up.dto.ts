import { IsEmail, Length } from 'class-validator';
import { Term } from '../user.schema';

export class SignUpDto {
  term!: Term;

  @IsEmail()
  email!: string;

  @Length(5, 15)
  password!: string;
}
