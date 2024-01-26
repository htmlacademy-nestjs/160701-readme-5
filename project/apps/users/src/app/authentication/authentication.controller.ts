import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  AuthKeyName,
  fillDto,
  generateSchemeApiError,
} from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordRdo } from './rdo/change-password.rdo';
import { NotifyService } from '../notify/notify.service';
import { MongoIdValidationPipe } from '@project/shared/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { RefreshUserRdo } from './rdo/refresh-user.rdo';
import { RequestWithUser } from '../blog-user/request-with-user.interface';
import { RequestWithTokenPayload } from '@project/libs/shared/app/types';

@ApiTags('auth')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
    schema: generateSchemeApiError(
      'User with this email already exists',
      HttpStatus.CONFLICT
    ),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    const { email, firstname, id } = newUser;
    await this.notifyService.registerSubscriber({
      email,
      firstname,
      userId: String(id),
    });

    return fillDto(UserRdo, newUser.toPOJO());
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
    schema: generateSchemeApiError(
      'Password or Login is wrong.',
      HttpStatus.UNAUTHORIZED
    ),
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    const { accessToken, refreshToken } =
      await this.authService.createUserToken(user);

    return fillDto(LoggedUserRdo, {
      ...user.toPOJO(),
      accessToken,
      refreshToken,
    });
  }

  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    type: RefreshUserRdo,
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiBearerAuth(AuthKeyName)
  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: generateSchemeApiError('User not found', HttpStatus.NOT_FOUND),
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoIdValidationPipe) id: string) {
    const existUser = await this.authService.getUserById(id);

    return fillDto(UserRdo, existUser.toPOJO());
  }

  @ApiResponse({
    type: ChangePasswordRdo,
    status: HttpStatus.OK,
    description: 'Password changed successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: generateSchemeApiError('User not found', HttpStatus.NOT_FOUND),
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request data',
    schema: generateSchemeApiError('Bad request data', HttpStatus.BAD_REQUEST),
  })
  @ApiBearerAuth(AuthKeyName)
  @UseGuards(JwtAuthGuard)
  @Patch('change-password/:id') //TODO получение id из jwt
  public async changePassword(
    @Param('id', MongoIdValidationPipe) id: string,
    @Body() dto: ChangePasswordDto
  ) {
    const newUser = await this.authService.changePassword(id, dto);
    const { email, firstname, id: userId } = newUser.toPOJO();

    await this.notifyService.changePassword({
      email,
      firstname,
      userId: String(userId),
    });

    return fillDto(ChangePasswordRdo, {
      message: 'Password changed successfully',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user }: RequestWithTokenPayload) {
    return user;
  }
}
