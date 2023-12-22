import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DBConfigModule } from '@config/database/config.module';
import { AppsModule } from '@apps/apps.module';
import { AuthConfigModule } from '@config/auth/config.module';
import { CONFIG_MODULES } from 'app.provider';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal : true}),
    DBConfigModule,
    AppsModule,
    AuthConfigModule,
    ...CONFIG_MODULES
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
