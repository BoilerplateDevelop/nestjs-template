import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserRegisterDto } from './dto/register.dto';
import { UserService } from './user.service';
import { HashFuncUtil } from '../../utils/hash.util';
import { ResponseSchema, ResponseStatus } from 'src/common/types/response.type';
import { Public } from '../../common/decorators/public.decorator';
import { User } from 'src/database/entities/user.entity';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly hashFuncUtil: HashFuncUtil,
  ) {}

  @Public()
  @Post('/register')
  async register(
    @Body() body: UserRegisterDto,
  ): Promise<ResponseSchema<Partial<User>>> {
    const hashedPassword = await this.hashFuncUtil.hashCode(body.password);

    const result = await this.userService.create({
      username: body.username,
      password: hashedPassword,
    });

    return {
      status: ResponseStatus.SUCCESS,
      data: result.raw?.[0],
    };
  }

  @Get()
  async findUser(@Req() req): Promise<ResponseSchema<Omit<User, 'password'>>> {
    const user = await this.userService.findOne({
      username: req.user.username,
    });

    return {
      status: ResponseStatus.SUCCESS,
      data: user,
    };
  }
}
