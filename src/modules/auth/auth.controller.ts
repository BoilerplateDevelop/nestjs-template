import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  ResponseSchema,
  ResponseStatus,
} from '../../common/types/response.type';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('validateToken')
  validateToken(): ResponseSchema<null> {
    // already validate before handler, in JWT stagery
    return {
      status: ResponseStatus.SUCCESS,
      data: null,
      message: 'Valid token',
    };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): ResponseSchema<{ accessToken: string }> {
    const user = req.user;

    const accessToken = this.authService.generateJWT({
      sub: user.id,
      username: user.username,
    });

    return {
      status: ResponseStatus.SUCCESS,
      data: {
        accessToken,
      },
    };
  }
}
