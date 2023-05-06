import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HashFuncUtil } from '../../utils/hash.util';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashFuncUtil: HashFuncUtil,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findActiveUserByUsername(username);

    if (!user) return null;

    if (!(await this.hashFuncUtil.matchCode(password, user.password)))
      return null;

    return user;
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload);
  }
}
