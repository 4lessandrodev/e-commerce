import { TagRepositoryInterface } from '../../Repo/tag.repository.interface';
import { RegisterTagUseCase } from './register-tag.use-case';

describe('register-tag.use-case', () => {
  //
  let repo: TagRepositoryInterface;
  //
  beforeAll(() => {
    repo = {
      updateOrCreate: jest.fn(),
      exists: jest.fn(),
      findTagsById: jest.fn(),
    };
  });
  //
  it('should be defined', () => {
    const useCase = new RegisterTagUseCase(repo);
    expect(useCase).toBeDefined();
  });

  it('should be defined', async () => {
    jest.spyOn(repo, 'exists').mockResolvedValueOnce(false);
    const useCase = new RegisterTagUseCase(repo);
    const result = await useCase.execute({ description: 'valid_description' });
    expect(result.isSuccess).toBe(true);
  });

  it('should be defined', async () => {
    jest.spyOn(repo, 'exists').mockResolvedValueOnce(true);
    const useCase = new RegisterTagUseCase(repo);
    const result = await useCase.execute({ description: 'valid_description' });
    expect(result.isFailure).toBe(true);
  });
});
