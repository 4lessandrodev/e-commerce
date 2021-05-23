import { IUseCase, Result } from 'types-ddd';
import { DeleteCollectionAddressDto } from './delete-collection-address-use-case.dto';
import { Inject, Injectable } from '@nestjs/common';
import { CollectionAddressRepositoryInterface } from '@repo/collection-address-repository.interface';

@Injectable()
export class DeleteCollectionAddressUseCase
  implements IUseCase<DeleteCollectionAddressDto, Result<void>>
{
  constructor(
    @Inject('CollectionAddressRepository')
    private readonly collectionAddressRepo: CollectionAddressRepositoryInterface,
  ) {}
  async execute(dto: DeleteCollectionAddressDto): Promise<Result<void>> {
    const id = dto.id;
    try {
      const addressExists = await this.collectionAddressRepo.exists({ id });

      if (!addressExists) {
        return Result.fail<void>('Address does not exists');
      }

      await this.collectionAddressRepo.delete({ id });
      return Result.ok<void>();
    } catch (error) {
      return Result.fail<void>(
        'Internal Server Error on Delete Collection Address Use Case',
      );
    }
  }
}
