import { AuthUser, UserRole } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public firstname!: string;
  public email!: string;
  public role!: UserRole;
  public passwordHash!: string;
  public avatar?: string;
  public createdAt!: Date;
  public publicationsCount!: number;
  public subscribersCount!: number;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      role: this.role,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt,
      publicationsCount: this.publicationsCount,
      subscribersCount: this.subscribersCount,
    };
  }

  public populate(data: AuthUser): void {
    this.id = data.id ?? undefined;
    this.email = data.email;
    this.firstname = data.firstname;
    this.role = data.role;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.publicationsCount = data.publicationsCount;
    this.subscribersCount = data.subscribersCount;
    this.passwordHash = data.passwordHash;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public async changePassword(oldPassword: string, newPassword: string) {
    const isPasswordEqual = await this.comparePassword(oldPassword);

    if (isPasswordEqual) {
      this.setPassword(newPassword);
    }

    return isPasswordEqual;
  }

  static fromObject(data: AuthUser): BlogUserEntity {
    return new BlogUserEntity(data);
  }
}
