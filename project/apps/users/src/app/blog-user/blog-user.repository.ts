import { BaseMemoryRepository } from '@project/shared/core';
import { BlogUserEntity } from './blog-user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserRepository extends BaseMemoryRepository<BlogUserEntity> {
  public async findByEmail(email: string) {
    const entities = await this.findAll();
    const user = entities.find((entity) => entity.email === email);

    return Promise.resolve(user);
  }
}
