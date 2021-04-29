import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { SignUpDto } from './sign-up.dto';
import { User } from '@domain/aggregates-root';
import { UserRepository } from '@infra/user/repo/user.repository';
import { UserRepositoryInterface } from '@repo/user-repository.interface';

@Injectable()
export class SignUpUseCase implements IUseCase<SignUpDto, Result<void>> {
  constructor(
    @Inject(UserRepository) private readonly userRepo: UserRepositoryInterface,
  ) {}
  async execute(dto: SignUpDto) {
    /**
     * @todo inject repository
     */

    const emailOrError = EmailValueObject.create(dto.email);
    const passwordOrError = PasswordValueObject.create(dto.password);

    const checkResults = Result.combine([emailOrError, passwordOrError]);

    if (checkResults.isFailure) {
      return Result.fail<void>(checkResults.error);
    }

    try {
      const isEmailAlreadyInUse: boolean = await this.userRepo.exists({
        email: dto.email,
      });

      if (isEmailAlreadyInUse) {
        return Result.fail<void>('Email Already in use');
      }

      const email = emailOrError.getResult();
      const password = passwordOrError.getResult();

      // Encrypt password before save
      await password.encryptPassword();

      /**
       * The role by default is undefined
       * It is set when register a profile for user
       */
      const user = User.create({
        email,
        password,
        isActive: true,
        isTheEmailConfirmed: false,
        role: 'UNDEFINED',
        terms: [dto.term],
      }).getResult();

      await this.userRepo.save(user);

      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>('Internal Server Error on SignIn UseCase');
    }
  }
}
