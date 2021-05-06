import { Inject } from '@nestjs/common';
import { IUseCase, Result } from 'types-ddd';
import { Tag } from '@domain/entities';
import { RegisterTagDto } from './register-tag.dto';
import { TagRepositoryInterface } from '@repo/tag.repository.interface';

export class RegisterTagUseCase
  implements IUseCase<RegisterTagDto, Result<void>> {
  //
  constructor(
    @Inject('TagRepository') private readonly tagRepo: TagRepositoryInterface,
  ) {}
  //
  async execute(dto: RegisterTagDto): Promise<Result<void>> {
    //

    const tagOrError = Tag.create({ description: dto.description });

    if (tagOrError.isFailure) {
      return Result.fail<void>(tagOrError.error.toString());
    }

    try {
      const tagAlreadyExist = await this.tagRepo.exists({
        description: dto.description,
      });

      if (tagAlreadyExist) {
        return Result.fail<void>('Tag already exist');
      }

      const tag = tagOrError.getResult();
      //
      await this.tagRepo.updateOrCreate(tag);
      //
      return Result.ok<void>();
      //
    } catch (error) {
      //
      return Result.fail<void>(
        'Internal Server Error on Register Tag Use Case',
      );
    }
  }
}
