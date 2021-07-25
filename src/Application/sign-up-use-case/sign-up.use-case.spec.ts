import { SignUpUseCase } from './sign-up.use-case';

describe('sign-in.use-case', () => {
	let userRepo: any;

	beforeEach(() => {
		// Clear all mocks
		jest.clearAllMocks();

		userRepo = {
			exists: jest.fn(),
			save: jest.fn()
		};
	});

	it('should be defined', async () => {
		const useCase = new SignUpUseCase(userRepo);
		expect(useCase).toBeDefined();
	});

	it('should fail if provide an invalid email', async () => {
		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute({
			email: 'invalid_email',
			password: '123456',
			acceptedTerm: true,
			term: {
				acceptedAt: new Date(),
				browser: 'firefox',
				ip: '123.123.123.123',
				os: 'Linux',
				termVersion: '1.0.2'
			}
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provide an invalid password', async () => {
		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: '',
			acceptedTerm: true,
			term: {
				acceptedAt: new Date(),
				browser: 'firefox',
				ip: '123.123.123.123',
				os: 'Linux',
				termVersion: '1.0.2'
			}
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if provided email is already in use', async () => {
		jest.spyOn(userRepo, 'exists').mockReturnValueOnce(true);

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute({
			email: 'already_in_use@domain.com',
			password: '',
			acceptedTerm: true,
			term: {
				acceptedAt: new Date(),
				browser: 'firefox',
				ip: '123.123.123.123',
				os: 'Linux',
				termVersion: '1.0.2'
			}
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if not accept the terms', async () => {
		jest.spyOn(userRepo, 'exists').mockReturnValueOnce(false);
		const spySave = jest.spyOn(userRepo, 'save');

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: '123456',
			acceptedTerm: false,
			term: {
				acceptedAt: new Date(),
				browser: 'firefox',
				ip: '123.123.123.123',
				os: 'Linux',
				termVersion: '1.0.2'
			}
		});

		expect(result.isFailure).toBe(true);
		expect(spySave).not.toHaveBeenCalled();
	});

	it('should be success', async () => {
		jest.spyOn(userRepo, 'exists').mockReturnValueOnce(false);
		const spySave = jest.spyOn(userRepo, 'save');

		const useCase = new SignUpUseCase(userRepo);

		const result = await useCase.execute({
			email: 'valid_email@domain.com',
			password: '123456',
			acceptedTerm: true,
			term: {
				acceptedAt: new Date(),
				browser: 'firefox',
				ip: '123.123.123.123',
				os: 'Linux',
				termVersion: '1.0.2'
			}
		});

		expect(result.isSuccess).toBe(true);
		expect(spySave).toHaveBeenCalled();
	});
});
