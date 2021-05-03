import { RegisterCityUseCase } from './register-city.use-case';

describe('register-city.use-case', () => {
  //
  let cityRepo: any;
  //
  beforeEach(() => {
    //
    jest.clearAllMocks();
    //
    cityRepo = {
      exists: jest.fn(),
      save: jest.fn(),
    };
  });

  //
  it('should be defined', () => {
    const useCase = new RegisterCityUseCase(cityRepo);
    expect(useCase).toBeDefined();
  });

  it('should save city with success', async () => {
    jest.clearAllMocks();
    jest.spyOn(cityRepo, 'exists').mockReturnValueOnce(false);

    const useCase = new RegisterCityUseCase(cityRepo);
    const result = await useCase.execute({
      geoCode: 100,
      name: 'valid_name',
      state: 'RJ',
    });

    expect(result.isSuccess).toBe(true);
  });

  it('should fail if provide invalid state initial', async () => {
    jest.clearAllMocks();
    jest.spyOn(cityRepo, 'exists').mockReturnValueOnce(false);

    const useCase = new RegisterCityUseCase(cityRepo);
    const result = await useCase.execute({
      geoCode: 100,
      name: 'valid_name',
      state: 'INVALID' as any,
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if city already exists', async () => {
    jest.spyOn(cityRepo, 'exists').mockImplementationOnce(() => true);

    const useCase = new RegisterCityUseCase(cityRepo);
    const result = await useCase.execute({
      geoCode: 100,
      name: 'valid_name',
      state: 'RJ',
    });

    expect(result.isFailure).toBe(true);
  });
});
