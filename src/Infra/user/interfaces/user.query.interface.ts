import { User } from '../user.schema';

export interface UserQueryInterface {
  getMyProfile: (id: string) => Promise<User>;
}
