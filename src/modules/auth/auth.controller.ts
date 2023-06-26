import {
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { generateResponse } from 'src/common/generic.response';
import { EStatus } from '../../common/generic.response';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('validateToken')
  validateToken(@Res() res) {
    // already validate before handler, in JWT stagery
    return res
      .status(HttpStatus.OK)
      .send(generateResponse(EStatus.SUCCESS, null));
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req, @Res() res) {
    const user = req.user;

    const accessToken = this.authService.generateJWT({
      sub: user.id,
      username: user.username,
    });

    return res.status(HttpStatus.OK).send(
      generateResponse(EStatus.SUCCESS, {
        accessToken,
      }),
    );
  }
}
