import { UserRole } from './user-role.enum';

export interface User {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  avatar: string;
  role: UserRole;
}
