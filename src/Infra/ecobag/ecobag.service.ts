import {
	Inject,
	Injectable,
	PreconditionFailedException
} from '@nestjs/common';

import { DefineEcobagPriceUseCase } from '@app/define-ecobag-price-use-case/define-ecobag-price.use-case';
import { DefineEcobagPriceDto } from '@app/define-ecobag-price-use-case/define-ecobag-price-use-case.dto';
import { Result } from 'types-ddd';

@Injectable()
export class EcobagService {
	constructor(
		@Inject(DefineEcobagPriceUseCase)
		private readonly defineEcobagPriceUseCase: DefineEcobagPriceUseCase
	) {}

	private checkResult(result: Result<void>): void {
		if (result.isFailure) {
			throw new PreconditionFailedException(result.error);
		}
	}

	async defineEcobagPrice(dto: DefineEcobagPriceDto): Promise<void> {
		const result = await this.defineEcobagPriceUseCase.execute(dto);
		this.checkResult(result);
	}
}
