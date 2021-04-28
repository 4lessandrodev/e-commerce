import { User } from '@domain/aggregates-root';
import { BaseRepository } from './base-repository.abstract';

export type UserRepositoryInterface = BaseRepository<User>;
