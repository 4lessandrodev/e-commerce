import { User } from '../entities/user.schema';

export interface UserQueryInterface {
  getMyProfile: (id: string) => Promise<User>;
}
