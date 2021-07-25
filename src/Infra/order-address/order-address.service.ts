import {
	Inject,
	Injectable,
	PreconditionFailedException
} from '@nestjs/common';

import { UpdateCollectionAddressUseCase } from '@app/update-collection-address-use-case/update-collection-address.use-case';
import { RegisterCollectionAddressUseCase } from '@app/register-collection-address-use-case/register-collection-address.use-case';
import { DeleteCollectionAddressUseCase } from '@app/delete-collection-address-use-case/delete-collection-address.use-case';
import { UpdateCollectionAddressDto } from '@app/update-collection-address-use-case/update-collection-address-use-case.dto';
import { RegisterCollectionAddressDto } from '@app/register-collection-address-use-case/register-collection-address-use-case.dto';
import { DeleteCollectionAddressDto } from '@app/delete-collection-address-use-case/delete-collection-address-use-case.dto';
import { Result } from 'types-ddd';

@Injectable()
export class OrderAddressService {
	constructor(
		@Inject(UpdateCollectionAddressUseCase)
		private readonly updateCollectionAddressUseCase: UpdateCollectionAddressUseCase,

		@Inject(RegisterCollectionAddressUseCase)
		private readonly createCollectionAddressUseCase: RegisterCollectionAddressUseCase,

		@Inject(DeleteCollectionAddressUseCase)
		private readonly deleteCollectionAddressUseCase: DeleteCollectionAddressUseCase
	) {}

	private checkResult(result: Result<void>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async updateAddress(dto: UpdateCollectionAddressDto): Promise<void> {
		const result = await this.updateCollectionAddressUseCase.execute(dto);
		this.checkResult(result);
	}

	async createAddress(dto: RegisterCollectionAddressDto): Promise<void> {
		const result = await this.createCollectionAddressUseCase.execute(dto);
		this.checkResult(result);
	}

	async deleteAddress(dto: DeleteCollectionAddressDto): Promise<void> {
		const result = await this.deleteCollectionAddressUseCase.execute(dto);
		this.checkResult(result);
	}
}
