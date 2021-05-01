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
  avatar?: Blob;
  hasEcobag: boolean;
  address: AddressDto;
}
