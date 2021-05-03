import { City } from '@domain/entities';
import { InitialStateValueObject } from '../../Domain/value-objects';
import { RegisterRegionUseCase } from './register-region.use-case';

describe('register-region.use-case', () => {
  //
  const fakeCity: City = City.create({
    geoCode: 2121,
    name: 'valid_name',
    stateInitial: InitialStateValueObject.create('RJ').getResult(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }).getResult();
  //
  let regionRepo: any;
  let cityRepo: any;
  //
  beforeAll(() => {
    regionRepo = {
      exists: jest.fn(),
      save: jest.fn(),
    };
    cityRepo = {
      findOne: jest.fn(),
    };
  });
  //
  it('should be defined', () => {
    const useCase = new RegisterRegionUseCase(regionRepo, cityRepo);
    expect(useCase).toBeDefined();
  });
  //
  it('should fail if provide an invalid freight price', async () => {
    jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(cityRepo, 'findOne').mockResolvedValueOnce(fakeCity);

    const useCase = new RegisterRegionUseCase(regionRepo, cityRepo);
    const result = await useCase.execute({
      cityId: 'valid_id',
      description: 'valid_description',
      freightPrice: -20,
      isActive: true,
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if not exist city for provided id', async () => {
    jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(cityRepo, 'findOne').mockResolvedValueOnce(null);

    const useCase = new RegisterRegionUseCase(regionRepo, cityRepo);
    const result = await useCase.execute({
      cityId: 'invalid_id',
      description: 'valid_description',
      freightPrice: 10,
      isActive: true,
    });

    expect(result.isFailure).toBe(true);
  });

  it('should fail if already exist region for provided description', async () => {
    jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(true);
    jest.spyOn(cityRepo, 'findOne').mockResolvedValueOnce(fakeCity);

    const useCase = new RegisterRegionUseCase(regionRepo, cityRepo);
    const result = await useCase.execute({
      cityId: 'valid_id',
      description: 'invalid_description',
      freightPrice: 10,
      isActive: true,
    });

    expect(result.isFailure).toBe(true);
  });

  it('should register region with success', async () => {
    jest.spyOn(regionRepo, 'exists').mockResolvedValueOnce(false);
    jest.spyOn(cityRepo, 'findOne').mockResolvedValueOnce(fakeCity);

    const useCase = new RegisterRegionUseCase(regionRepo, cityRepo);
    const result = await useCase.execute({
      cityId: 'valid_id',
      description: 'valid_description',
      freightPrice: 10,
      isActive: true,
    });

    expect(result.isSuccess).toBe(true);
  });
});
