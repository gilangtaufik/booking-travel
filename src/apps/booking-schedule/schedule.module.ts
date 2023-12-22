import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ScheduleController } from './controllers/schedule.controller';
import { AppService } from '../../app.service';
import { DBConfigModule } from '@config/database/config.module';
import { ScheduleService } from './services/schedule.service';

@Module({
  imports: [
    // AppService
  ],
  controllers: [ScheduleController],
  providers: [ScheduleController,ScheduleService],
  exports: [ScheduleController],
})
export class ScheduleModule {}
