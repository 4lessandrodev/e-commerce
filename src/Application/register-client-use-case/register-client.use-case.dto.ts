import { File } from '@shared/services/upload-files/interfaces/uploader.interface';

export interface AddressDto {
  zipCode: string;
  street: string;
  number: string;
  complement: string;
  regionId: string;
}

export interface RegisterClientDto {
  userId: string;
  name: string;
  avatar?: File;
  hasEcobag: boolean;
  address: AddressDto;
}
