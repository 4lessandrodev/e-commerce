import { File } from '@shared/services/upload-files/interfaces/uploader.interface';

export interface ItemDto {
  productId: string;
  quantity: number;
}

export interface RegisterBasketDto {
  description: string;
  categoryId: string;
  price: number;
  isActive: boolean;
  images?: File;
  items?: ItemDto[];
  info?: string;
  tagsIds?: string[];
}
