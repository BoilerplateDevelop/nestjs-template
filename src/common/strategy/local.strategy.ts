import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { CustomException } from '../exception/custom.exception';
import { ERROR } from '../exception/constants/error.message.constant';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);

    if (!user) {
      throw new CustomException(ERROR.UNAUTHORIZED_EXCEPTION);
    }

    return user;
  }
}
