import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Headers,
  Ip,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { Payload } from './interfaces/payload.interface';
import { GetUser } from './services/get-user.decorator';
import { User } from './user.schema';
import { UserService } from './user.service';
import { UAParser } from 'ua-parser-js';
import { HeaderUserAgent } from './interfaces/user-agent.interface';

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
  getMyProfile(
    @GetUser() user: JwtPayload,
    @Ip() ip: string,
    @Headers() headers: HeaderUserAgent,
  ): Promise<User> {
    //
    const parser = new UAParser();
    const userAgent = headers['user-agent'];
    parser.setUA(userAgent);
    const result = parser.getResult();
    console.log(result);

    return this.userService.getMyProfile(user.id);
  }
}
