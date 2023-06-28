import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/database/entities/user.entity';

export class FindUserResponseDto extends User {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'developer' })
  username: string;

  @ApiProperty({ example: 1 })
  status: number;
}
