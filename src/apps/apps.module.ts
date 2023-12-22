import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ScheduleModule } from '@apps/booking-schedule/schedule.module';
import { DBConfigModule } from '@config/database/config.module';
import { AuthAppsModule } from '@apps/auth/auth.module';
import { BookingModule } from './bookings/booking.module';
import { HttpExceptionFilter } from '@config/exception/exception.filter';
import { APP_FILTER } from '@nestjs/core';
import { AuthController } from './auth/controllers/auth.controller';
import { PassengerModule } from './passenger/passenger.module';

@Module({
  imports: [
    ScheduleModule,
    AuthAppsModule,
    BookingModule,
    PassengerModule
  ],
})
export class AppsModule {}
