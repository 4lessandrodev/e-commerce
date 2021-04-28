import { Role } from '@domain/aggregates-root/user/User.domain-aggregate-root-interface';

export interface JwtPayload {
  id: string;
  role: Role;
}
