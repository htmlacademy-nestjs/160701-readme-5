import { UserRole } from './users/user-role.enum';

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  firstname: string;
}
