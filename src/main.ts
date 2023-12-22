import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { AllExceptionsFilter } from '@utils/all-exception-filter';
import { install } from 'source-map-support';
import { join } from 'path';
import { readFileSync } from 'fs';
import { WinstonModule, utilities as nestWinstonModuleUtil } from 'nest-winston';
import * as winston from 'winston';
// import { UserInterceptor } from '@utils/interceptors/user.interceptor';
import * as os from 'os';
// import { CustomValidationPipe } from '@utils/pipe/ValidationPipe';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@config/exception/exception.filter';


async function bootstrap() { 
  install();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: WinstonModule.createLogger({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            winston.format.json(),
            // createNewrelicWinstonFormatter()(),
            nestWinstonModuleUtil.format.nestLike(
              process.env.APP_NAME,
              { prettyPrint: true, colors: true },
            ),
          ),
        }),
      ],
    }),
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  process.on('unhandledRejection', (reason, promise) => {
    new Logger('SYSTEM').error('UNHANDLED REJECTION', (reason as any)?.stack);
    throw reason;
  });

  app.enableVersioning({ type: VersioningType.URI });

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
    credentials: false,
  });

  
  const configService = app.get(ConfigService);
  const appPort = configService.get<number>('app.port');
  await app.listen(appPort);
}

bootstrap();










