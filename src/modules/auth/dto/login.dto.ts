import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestBodyDto {
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;
}

export class LoginResponseDto {
  @ApiProperty({ example: 'accessToken' })
  accessToken: string;
}
