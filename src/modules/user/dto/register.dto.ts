import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserRegisterRequestBodyDto {
  @ApiProperty({ example: 'username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UserRegisterResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 1 })
  status: number;

  @ApiProperty({ example: '2023-06-28T17:07:08.513Z' })
  createdAt: Date;

  @ApiProperty({ example: '2023-06-28T17:07:08.513Z' })
  updatedAt: Date;

  @ApiProperty({ example: null })
  deletedAt: Date | null;
}
