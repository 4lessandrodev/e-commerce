import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from './user.service';

@Controller('v1/auth')
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signin')
  signIn(@Body() dto: SignInDto): Promise<void> {
    return this.userService.signIn(dto);
  }

  /*   @Get()
  signUp(@Body() dto: SignUpDto): Promise<Payload> {
    return {};
  } */
}
