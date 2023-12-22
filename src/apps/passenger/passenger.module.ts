import { Module } from '@nestjs/common';
import { PassengerController } from './controllers/passenger.controller';
import { PassengerService } from './services/passenger.service';

@Module({
  imports: [
  ],
  controllers: [PassengerController],
  providers: [PassengerController,PassengerService],
  exports: [PassengerController],
})
export class PassengerModule {}
