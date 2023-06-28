import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiGeneralResponse } from 'src/common/decorators/apiGeneralResponse.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginRequestBodyDto, LoginResponseDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiGeneralResponse()
  @Post('validateToken')
  validateToken() {
    // already validate before handler, in JWT stagery
    return null;
  }

  @Public()
  @ApiGeneralResponse(LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(
    @Req() req,
    @Body() body: LoginRequestBodyDto,
  ): { accessToken: string } {
    const user = req.user;

    const accessToken = this.authService.generateJWT({
      sub: user.id,
      username: user.username,
    });

    return {
      accessToken,
    };
  }
}
