import { Token } from '@project/libs/shared/app/types';
import { Entity } from '@project/shared/core';

export class RefreshTokenEntity implements Entity<string>, Token {  
  public createdAt!: Date;
  public expiresIn!: Date;
  public id!: string;
  public tokenId!: string;
  public userId!: string;
  [key: string]: unknown;

  constructor(refreshToken: Token) {
    this.createdAt = new Date;
    this.fillEntity(refreshToken);
  }

  public fillEntity(entity: Token): void {
    this.userId = entity.userId;
    this.id = String(entity.id)
    this.tokenId = entity.tokenId;
    this.createdAt = entity.createdAt;
    this.expiresIn = entity.expiresIn;
  }

  public toPOJO(): RefreshTokenEntity {
    return { ...this };
  }

}