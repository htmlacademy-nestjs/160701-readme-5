import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser, UserRole } from '@project/libs/shared/app/types';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG,
  OLD_PASSWORD_NOT_CORRECT,
} from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(private readonly blogUserRepository: BlogUserRepository) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, lastname, password } = dto;

    const blogUser: AuthUser = {
      email,
      firstname,
      lastname,
      role: UserRole.User,
      avatar: '',
      passwordHash: '',
      createdAt: new Date(),
      publicationsCount: 0,
      subscribersCount: 0,
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser || !(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUserById(id: string) {
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return existUser;
  }

  public async changePassword(dto: ChangePasswordDto) {
    const { id, oldPassword, newPassword } = dto;
    const existUser = await this.getUserById(id);
    const isOldPasswordCorrect = await existUser.comparePassword(oldPassword);

    if (!isOldPasswordCorrect) {
      throw new BadRequestException(OLD_PASSWORD_NOT_CORRECT);
    }

    await existUser.setPassword(newPassword);

    return existUser;
  }
}
