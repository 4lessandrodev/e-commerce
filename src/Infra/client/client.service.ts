import { RegisterClientUseCase } from '@app/register-client-use-case/register-client.use-case';
import { RegisterClientDto } from './dto/register-client.dto';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';

@Injectable()
export class ClientService {
  constructor(
    @Inject(RegisterClientUseCase)
    private readonly registerClientUseCase: RegisterClientUseCase,
  ) {}

  async registerClient(dto: RegisterClientDto): Promise<void> {
    const result = await this.registerClientUseCase.execute(dto);

    if (result.isFailure) {
      throw new PreconditionFailedException(result.error);
    }
  }
}
