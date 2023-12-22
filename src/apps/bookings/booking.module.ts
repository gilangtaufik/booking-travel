import { Module } from '@nestjs/common';
import { BookingService } from './services/booking.service';
import { BookingController } from './controllers/booking.controller';

@Module({
  imports: [
  ],
  controllers: [BookingController],
  providers: [BookingController,BookingService],
  exports: [BookingController],
})
export class BookingModule {}
