import { IUseCase, Result } from 'types-ddd';
import { Payload } from '@infra/user/interfaces/payload.interface';
import { SignUpDto } from './sign-up.dto';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryInterface } from '@repo/user-repository.interface';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@infra/user/repo/user.repository';

@Injectable()
export class SignUpUseCase implements IUseCase<SignUpDto, Result<Payload>> {
  constructor(
    @Inject(JwtService) private readonly jwt: JwtService,
    @Inject(UserRepository) private readonly userRepo: UserRepositoryInterface,
  ) {}

  async execute(dto: SignUpDto): Promise<Result<Payload>> {
    try {
      const user = await this.userRepo.find({ email: dto.email });

      if (!user) {
        return Result.fail<Payload>('Invalid email or password');
      }

      const passwordMatch = await user.password.comparePassword(dto.password);

      if (!passwordMatch) {
        return Result.fail<Payload>('Invalid email or password');
      }

      const token = this.jwt.sign({ id: user.id.toString() });

      return Result.ok<Payload>({ token });

      //
    } catch (error) {
      return Result.fail<Payload>('Internal Server Error on SignUp use case');
    }
  }
}
