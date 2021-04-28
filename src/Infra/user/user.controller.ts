import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Payload } from './interfaces/payload.interface';
import { UserService } from './user.service';

@Controller('v1/auth')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<void> {
    return this.userService.signIn(dto);
  }

  @Post('signup')
  signUp(@Body() dto: SignUpDto): Promise<Payload> {
    return this.userService.SignUp(dto);
  }
}
