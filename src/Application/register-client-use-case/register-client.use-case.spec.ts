import { ClientRepositoryInterface } from '@repo/client-repository.interface';
import { RegionRepositoryInterface } from '@repo/region-repository.interface';
import { RegisterClientUseCase } from './register-client.use-case';

describe('register-client.use-case', () => {
	let clientRepo: ClientRepositoryInterface;
	let regionRepo: RegionRepositoryInterface;
	//
	beforeEach(() => {
		//
		clientRepo = {
			save: jest.fn(),
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn()
		};

		regionRepo = {
			save: jest.fn(),
			delete: jest.fn(),
			exists: jest.fn(),
			find: jest.fn(),
			findOne: jest.fn()
		};
	});

	it('should be defined', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);
		expect(useCase).toBeDefined();
	});

	it('should fail if some value object fail. On this case zip code', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);
		const result = await useCase.execute({
			userId: 'valid_id',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: 'valid_regionId',
				street: 'valid_street',
				zipCode: 'invalid_zip_code'
			},
			hasEcobag: false,
			name: 'valid_name'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if some value object fail. On this case Client name', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);
		const result = await useCase.execute({
			userId: 'valid_id',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: 'valid_regionId',
				street: 'valid_street',
				zipCode: '75520140'
			},
			hasEcobag: false,
			name: ''
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if some value object fail. On this case Region name', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);
		const result = await useCase.execute({
			userId: 'valid_id',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: '',
				street: 'valid_street',
				zipCode: '75520140'
			},
			hasEcobag: false,
			name: 'valid_name'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if client profile already exists for userId', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);

		jest.spyOn(clientRepo, 'exists').mockResolvedValueOnce(true);

		const result = await useCase.execute({
			userId: 'valid_userId',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: 'valid_regionId',
				street: 'valid_street',
				zipCode: '75520140'
			},
			hasEcobag: false,
			name: 'valid_name'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should fail if client profile already exists for userId', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);

		jest.spyOn(clientRepo, 'exists').mockResolvedValueOnce(false);
		jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(false);

		const result = await useCase.execute({
			userId: 'valid_userId',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: 'valid_regionId',
				street: 'valid_street',
				zipCode: '75520140'
			},
			hasEcobag: false,
			name: 'valid_name'
		});

		expect(result.isFailure).toBe(true);
	});

	it('should save with success', async () => {
		const useCase = new RegisterClientUseCase(
			clientRepo as any,
			regionRepo as any
		);

		jest.spyOn(clientRepo, 'exists').mockResolvedValueOnce(false);
		jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(true);
		const saveSpy = jest.spyOn(clientRepo, 'save');

		const result = await useCase.execute({
			userId: 'valid_userId',
			address: {
				complement: 'valid_complement',
				number: '777',
				regionId: 'valid_regionId',
				street: 'valid_street',
				zipCode: '75520140'
			},
			hasEcobag: false,
			name: 'valid_name'
		});

		expect(result.isSuccess).toBe(true);
		expect(saveSpy).toBeCalled();
	});
});
