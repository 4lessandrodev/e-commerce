import { Role } from '@domain/aggregates-root';

export interface JwtPayload {
  id: string;
  role: Role;
}
