import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Payload } from './interfaces/payload.interface';
import { GetUser } from './services/get-user.decorator';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User } from './user.schema';
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

  @Get('me')
  @UseGuards(AuthGuard())
  getMyProfile(@GetUser() user: JwtPayload): Promise<User> {
    return this.userService.getMyProfile(user.id);
  }
}
