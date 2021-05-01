import { User } from '@domain/aggregates-root';
import { IBaseRepository } from 'types-ddd';

export interface UserRepositoryInterface extends IBaseRepository<User> {}
