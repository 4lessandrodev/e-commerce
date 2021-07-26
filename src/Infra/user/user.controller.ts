import { AuthGuard } from '@nestjs/passport';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtPayload } from './interfaces/jwt.payload.interface';
import { Payload } from './interfaces/payload.interface';
import { GetUser } from './services/get-user.decorator';
import { Term, User } from './entities/user.schema';
import { UserService } from './user.service';
import { GetUserAgent } from './services/get-user-agent.decorator';
import { GetUsersPayload } from './interfaces/get-users-payload.interface';
import { objectKeysToCamelCaseV2 } from 'keys-converter';
import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe,
	UseGuards,
	Ip,
	Query,
	Param
} from '@nestjs/common';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('v1/auth')
@UsePipes(new ValidationPipe())
export class UserController {
	constructor (private readonly userService: UserService) {}

	@Post('signin')
	async signIn (@Body() dto: SignInDto): Promise<Payload> {
		return await this.userService.signIn(dto);
	}

	@Post('signup')
	async signUp (
		@GetUserAgent() term: Term,
		@Ip() ip: string,
		@Body() dto: SignUpDto
	): Promise<void> {
		term.ip = ip;
		dto.term = term;
		return await this.userService.SignUp(dto);
	}

	@Get('me')
	@UseGuards(AuthGuard())
	async getMyProfile (@GetUser() user: JwtPayload): Promise<User> {
		return await this.userService.getMyProfile(user.id);
	}

	@Get('users')
	@UseGuards(AuthGuard())
	async getUsers (@Query() dto: GetUsersDto): Promise<GetUsersPayload> {
		const converted = objectKeysToCamelCaseV2(dto);

		return await this.userService.getUsers({ ...converted }, { ...dto });
	}

	@Get('users/:id')
	@UseGuards(AuthGuard())
	async getUserById (@Param('id') id: string): Promise<User | null> {
		return await this.userService.getUserById(id);
	}
}
