import { TokenPayload, User } from '@project/libs/shared/app/types';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: String(user.id),
    email: user.email,
    role: user.role,
    firstname: user.firstname,
  };
}