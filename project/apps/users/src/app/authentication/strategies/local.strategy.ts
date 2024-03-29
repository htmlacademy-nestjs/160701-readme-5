import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthenticationService } from '../authentication.service';
import { User } from '@project/libs/shared/app/types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  public async validate(email: string, password: string): Promise<User> {
    return this.authService.verifyUser({ email, password });
  }
}
