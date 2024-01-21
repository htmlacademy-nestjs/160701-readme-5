import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillDto, generateSchemeApiError } from '@project/shared/helpers';
import { UserRdo } from './rdo/user.rdo';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordRdo } from './rdo/change-password.rdo';
import { NotifyService } from '../notify/notify.service';

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

    const { email, firstname, lastname } = newUser;
    await this.notifyService.registerSubscriber({ email, firstname, lastname });

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
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);

    return fillDto(LoggedUserRdo, verifiedUser.toPOJO());
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    schema: generateSchemeApiError('User not found', HttpStatus.NOT_FOUND),
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
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
  @Patch('change-password')
  public async changePassword(@Body() dto: ChangePasswordDto) {
    await this.authService.changePassword(dto);

    return fillDto(ChangePasswordRdo, {
      message: 'Password changed successfully',
    });
  }
}
