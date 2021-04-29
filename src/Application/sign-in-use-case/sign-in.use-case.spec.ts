import { JwtService } from '@nestjs/jwt';
import { User } from '@domain/aggregates-root';
import { UserRepositoryInterface } from '@repo/user-repository.interface';
import { SignInUseCase } from './sign-in.use-case';
import { EmailValueObject, PasswordValueObject } from '@domain/value-objects';
import { DomainId } from 'types-ddd';

describe('sign-in.use-case', () => {
  //
  const user: User = User.create(
    {
      terms: [
        {
          acceptedAt: new Date(),
          browser: 'firefox',
          ip: '123.123.123.123',
          os: 'Linux',
          termVersion: '1.0.5',
        },
      ],
      role: 'ADMIN',
      password: PasswordValueObject.create('valid_pass').getResult(),
      isTheEmailConfirmed: true,
      isActive: true,
      email: EmailValueObject.create('valid_email@domain.com').getResult(),
    },
    DomainId.create('valid_id').id,
  ).getResult();
  //
  let jwtService: JwtService;
  let userRepository: UserRepositoryInterface;

  beforeEach(() => {
    //
    jest.clearAllMocks();
    //
    jwtService = ({
      sign: jest.fn(),
    } as unknown) as JwtService;
    //
    userRepository = {
      delete: jest.fn(),
      exists: jest.fn(),
      find: jest.fn(),
      save: jest.fn(),
    };
  });
  //
  it('should be defined', () => {
    const useCase = new SignInUseCase(jwtService, userRepository);
    expect(useCase).toBeDefined();
  });

  it('should fail if user does not exist', async () => {
    //
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(null);
    //
    const useCase = new SignInUseCase(jwtService, userRepository);
    const result = await useCase.execute({
      email: 'invalid_email@main.com',
      password: 'invalid_pass',
    });
    //
    expect(result.isFailure).toBe(true);
  });

  it('should fail if password does not match', async () => {
    //
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(user);
    //
    const useCase = new SignInUseCase(jwtService, userRepository);
    const result = await useCase.execute({
      email: 'valid_email@domain.com',
      password: 'invalid_pass',
    });
    //
    expect(result.isFailure).toBe(true);
  });

  it('should return a token with success', async () => {
    //
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue('valid_token');
    //
    const useCase = new SignInUseCase(jwtService, userRepository);
    const result = await useCase.execute({
      email: 'valid_email@domain.com',
      password: 'valid_pass',
    });
    //
    expect(result.isSuccess).toBe(true);
    expect(result.getResult().token).toBe('valid_token');
  });
});
