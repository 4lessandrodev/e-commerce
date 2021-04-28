import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { SignInUseCase } from '@app/sign-in-use-case/sign-in.use-case';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(SignInUseCase) private readonly signInUseCase: SignInUseCase,
  ) {}

  async signIn(dto: SignInDto): Promise<void> {
    const result = await this.signInUseCase.execute(dto);
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
