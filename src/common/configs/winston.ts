import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { ConfigService } from '@nestjs/config';
const WinstonCloudWatch = require('winston-cloudwatch');
const AWS = require('aws-sdk');

export class WinstonService {
  static getOption = (
    configService: ConfigService,
  ): {
    console: winston.transports.ConsoleTransportOptions;
    cloudWatchConfig;
  } => {
    AWS.config.update({
      accessKeyId: configService.get('AWS_CLOUDWATCH_ACCESS_KEY_ID'),
      secretAccessKey: configService.get('AWS_CLOUDWATCH_SECRET_ACCESS_KEY'),
      region: configService.get('AWS_CLOUDWATCH_REGION'),
    });

    return {
      console: {
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.ms(),
          nestWinstonModuleUtilities.format.nestLike('Application', {
            prettyPrint: true,
          }),
        ),
      },
      cloudWatchConfig: {
        level: 'info',
        name: 'Cloudwatch Logs',
        cloudWatchLogs: new AWS.CloudWatchLogs(),
        logGroupName: configService.get('AWS_CLOUDWATCH_LOG_GROUP'),
        logStreamName: configService.get('NODE_ENV'),
        createLogGroup: false,
        createLogStream: true,
      },
    };
  };

  static getNestModuleOption = (
    configService: ConfigService,
  ): WinstonModuleOptions => {
    return {
      exitOnError: false,
      transports: [
        new winston.transports.Console(
          WinstonService.getOption(configService).console,
        ),
        new WinstonCloudWatch(
          WinstonService.getOption(configService).cloudWatchConfig,
        ),
      ],
    };
  };
}
