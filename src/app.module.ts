import { MailerModule } from '@nestjs-modules/mailer';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from './common/configs/configuration';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import {
  APP_FILTER,
  APP_GUARD,
  APP_INTERCEPTOR,
  RouterModule,
} from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { WinstonModule } from 'nest-winston';
import { WinstonService } from './common/configs/winston';
import { AuthModule } from './modules/auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const transport: TransportType = {
          host: configService.get('MAILER_HOST'),
          port: configService.get('MAILER_PORT'),
          auth: {
            user: configService.get('MAILER_USER'),
            pass: configService.get('MAILER_PASS'),
          },
        };

        return {
          transport,
          // preview: configService.get('NODE_ENV') === 'development',
          template: {
            dir: __dirname + '/templates',
            adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
            options: {
              strict: true,
            },
          },
          defaults: {
            from: configService.get('MAILER_EMAIL'),
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        entities: ['dist/**/*.entity.{ts,js}'],
        options: {
          encrypt: false,
        },
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get('NODE_ENV') === 'development',
      }),
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        WinstonService.getNestModuleOption(configService),
    }),
    UtilsModule,
    AuthModule,
    UserModule,
    RouterModule.register([
      {
        path: 'auth',
        module: AuthModule,
      },
      {
        path: 'user',
        module: UserModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule {}
