import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  UserRegisterRequestBodyDto,
  UserRegisterResponseDto,
} from './dto/register.dto';
import { UserService } from './user.service';
import { HashFuncUtil } from '../../utils/hash.util';
import { Public } from '../../common/decorators/public.decorator';
import { FindUserResponseDto } from './dto/get-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiGeneralResponse } from 'src/common/decorators/apiGeneralResponse.decorator';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly hashFuncUtil: HashFuncUtil,
  ) {}

  @Public()
  @ApiGeneralResponse(UserRegisterResponseDto)
  @Post('/register')
  async register(@Body() body: UserRegisterRequestBodyDto) {
    const hashedPassword = await this.hashFuncUtil.hashCode(body.password);
    const result = await this.userService.create({
      username: body.username,
      password: hashedPassword,
    });

    return result.raw?.[0];
  }

  @Get()
  @ApiGeneralResponse(FindUserResponseDto)
  async findUser(@Req() req) {
    const user = await this.userService.findOne({
      username: req.user.username,
    });

    return user;
  }
}
