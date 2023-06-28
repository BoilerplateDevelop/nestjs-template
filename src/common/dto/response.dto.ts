import { ApiProperty } from '@nestjs/swagger';
import { EStatus } from '../generic.response';

export class ResponseDto<T> {
  @ApiProperty()
  readonly data: T;

  @ApiProperty({ example: EStatus.SUCCESS })
  readonly status: EStatus;

  @ApiProperty({ example: '0' })
  readonly rtnCode: string;

  @ApiProperty({ example: '' })
  readonly msg: string;
}
