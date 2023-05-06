import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HashFuncUtil {
  saltOrRounds: number;

  constructor(private readonly configService: ConfigService) {
    this.saltOrRounds = parseInt(this.configService.get('BCRYPT_SALT'));
  }

  async hashCode(password: string) {
    const salt = await bcrypt.genSalt(this.saltOrRounds);
    return bcrypt.hash(password, salt);
  }

  matchCode(password: string, hashPassword: string) {
    return bcrypt.compare(password, hashPassword);
  }
}
