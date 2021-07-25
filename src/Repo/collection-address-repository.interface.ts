import { IBaseRepository } from 'types-ddd';
import { DeliveryOrCollectionAddress } from '@domain/entities';

export interface CollectionAddressRepositoryInterface
	extends IBaseRepository<DeliveryOrCollectionAddress> {}
