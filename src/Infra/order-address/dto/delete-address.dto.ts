import { IsNotEmpty, IsUUID } from 'class-validator';

export class AddressIdDto {
  @IsUUID()
  @IsNotEmpty()
  id!: string;
}
