import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BlogUserRepository } from '../blog-user/blog-user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import {
  AuthUser,
  TokenPayload,
  User,
  UserRole,
} from '@project/libs/shared/app/types';
import {
  AUTH_USER_EXISTS,
  AUTH_USER_NOT_FOUND_OR_PASSWORD_WRONG,
  OLD_PASSWORD_NOT_CORRECT,
} from './authentication.constants';
import { BlogUserEntity } from '../blog-user/blog-user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, firstname, password } = dto;

    const blogUser: AuthUser = {
      email,
      firstname,
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

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const existUser = await this.getUserById(id);
    const isOldPasswordCorrect = await existUser.comparePassword(oldPassword);

    if (!isOldPasswordCorrect) {
      throw new BadRequestException(OLD_PASSWORD_NOT_CORRECT);
    }

    const newUser = await existUser.setPassword(newPassword);

    await this.blogUserRepository.update(id, newUser);

    return newUser;
  }

  public async createUserToken(user: User) {
    const payload: TokenPayload = {
      sub: String(user.id), //TODO id is optional
      email: user.email,
      role: user.role,
      firstname: user.firstname,
    };

    try {
      const accessToken = await this.jwtService.signAsync(payload);

      return { accessToken };
    } catch (error: any) {
      this.logger.error('[Token generation error]: ' + error.message);

      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
