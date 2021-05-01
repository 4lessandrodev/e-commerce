import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { SignUpUseCase } from '@app/sign-up-use-case/sign-up.use-case';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { Payload } from './interfaces/payload.interface';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { User } from './entities/user.schema';
import { UserQuery } from './repo/user.query';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,
    @Inject(SignUpUseCase) private readonly signUpUseCase: SignUpUseCase,
    @Inject(UserQuery) private readonly userQuery: UserQuery,
  ) {}

  async signIn(dto: SignInDto): Promise<Payload> {
    const result = await this.signInUseCase.execute(dto);
    //
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
    return { token: result.getResult().token };
  }

  async SignUp(dto: SignUpDto): Promise<void> {
    const result = await this.signUpUseCase.execute(dto);
    if (result.isFailure) {
      //
      throw new PreconditionFailedException(result.error);
    }
  }

  // Query Repository
  async getMyProfile(id: string): Promise<User> {
    return this.userQuery.getMyProfile(id);
  }
}
