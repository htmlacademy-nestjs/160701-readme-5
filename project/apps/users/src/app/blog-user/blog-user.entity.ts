import { AuthUser, UserRole } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string | undefined;
  public firstname: string;
  public lastname: string;
  public email: string;
  public role: UserRole;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }
  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      role: this.role,
      passwordHash: this.passwordHash,
    };
  }
  public populate(data: AuthUser): void {
    this.email = data.email;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.role = data.role;
  }
}
