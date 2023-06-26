import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { HashFuncUtil } from '../../utils/hash.util';
import { Public } from '../../common/decorators/public.decorator';
import { EStatus, generateResponse } from 'src/common/generic.response';
import { Response } from 'express';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly hashFuncUtil: HashFuncUtil,
  ) {}

  @Public()
  @Post('/register')
  async register(@Res() res: Response, @Body() body: UserRegisterDto) {
    const hashedPassword = await this.hashFuncUtil.hashCode(body.password);
    const result = await this.userService.create({
      username: body.username,
      password: hashedPassword,
    });

    return res
      .status(HttpStatus.OK)
      .send(generateResponse(EStatus.SUCCESS, result.raw?.[0]));
  }

  @Get()
  async findUser(@Req() req, @Res() res) {
    const user = await this.userService.findOne({
      username: req.user.username,
    });

    return res
      .status(HttpStatus.OK)
      .send(generateResponse(EStatus.SUCCESS, user));
  }
}
