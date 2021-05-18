import { RegisterClientUseCase } from '@app/register-client-use-case/register-client.use-case';
import { RegisterClientDto } from './dto/register-client.dto';
import { Inject, Injectable } from '@nestjs/common';
import { PreconditionFailedException } from '@nestjs/common';
import { Result } from 'types-ddd';

@Injectable()
export class ClientService {
  constructor(
    @Inject(RegisterClientUseCase)
    private readonly registerClientUseCase: RegisterClientUseCase,
  ) {}

  private checkResult(result: Result<void>): void {
    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }

  async registerClient(dto: RegisterClientDto): Promise<void> {
    const result = await this.registerClientUseCase.execute(dto);
    this.checkResult(result);
  }
}
