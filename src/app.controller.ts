import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiGeneralResponse } from './common/decorators/apiGeneralResponse.decorator';
import { Public } from './common/decorators/public.decorator';
import { HealthCheckDto } from './healthCheck.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Public()
  @ApiGeneralResponse(HealthCheckDto)
  healthCheck() {
    return {
      ping: 'pong',
    };
  }
}
