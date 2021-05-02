import { File } from '@shared/services/upload-files/interfaces/uploader.interface';
import { JwtPayload } from '../user/interfaces/jwt.payload.interface';
import { RegisterClientDto } from './dto/register-client.dto';
import { GetUser } from '../user/services/get-user.decorator';
import { ClientService } from './client.service';
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('v1/client')
@UsePipes(new ValidationPipe())
@UseGuards(AuthGuard())
export class ClientController {
  constructor(
    @Inject(ClientService) private readonly clientService: ClientService,
  ) {}

  @Post()
  registerClient(
    @GetUser() user: JwtPayload,
    @Body() dto: RegisterClientDto,
    @UploadedFile() files: File,
  ): Promise<void> {
    dto.avatar = files ? files : undefined;
    dto.userId = user.id;
    return this.clientService.registerClient(dto);
  }
}
