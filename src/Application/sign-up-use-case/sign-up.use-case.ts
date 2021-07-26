import { UserRepositoryInterface } from '@repo/user-repository.interface';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { Inject, Injectable } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { SignUpDto } from './sign-up.dto';
import { User } from '@domain/aggregates-root';

@Injectable()
export class SignUpUseCase implements IUseCase<SignUpDto, Result<void>> {
	constructor(
		@Inject('UserRepository')
		private readonly userRepo: UserRepositoryInterface
	) {}

	async execute(dto: SignUpDto) {
		//
		const acceptedTerm = dto.acceptedTerm;
		if (!acceptedTerm) {
			return Result.fail<void>('You must accept the terms');
		}

		const emailOrError = EmailValueObject.create(dto.email);
		const passwordOrError = PasswordValueObject.create(dto.password);

		const checkResults = Result.combine([emailOrError, passwordOrError]);

		if (checkResults.isFailure) {
			return Result.fail<void>(checkResults.error);
		}

		try {
			const isEmailAlreadyInUse: boolean = await this.userRepo.exists({
				email: dto.email
			});

			if (isEmailAlreadyInUse) {
				return Result.fail<void>('Email Already in use');
			}

			const email = emailOrError.getResult();
			const password = passwordOrError.getResult();

			// Encrypt password before save
			await password.encryptPassword();

			const user = User.create({
				email,
				password,
				isActive: true,
				isTheEmailConfirmed: false,
				role: 'CLIENT',
				terms: [dto.term]
			}).getResult();

			await this.userRepo.save(user);

			return Result.ok<void>();
			//
		} catch (error) {
			//
			return Result.fail<void>('Internal Server Error on SignUp UseCase');
		}
	}
}
