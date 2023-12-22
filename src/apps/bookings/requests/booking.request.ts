import { PaginationRequest } from '@utils/requests/pagination.request';
import { Passenger } from '../../../models/core/Passenger';
import {
  ArrayNotEmpty,
    IsDate,
  IsIn,
  IsNotEmpty, IsNumber, IsOptional, IsString, Length, ValidateNested, isNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

  export class BookingRequest {
    @IsNotEmpty()
    @IsNumber()
    scheduleId: number;
  
    @ArrayNotEmpty()
    @ValidateNested({ always: true, each : true})
    @Type(() => PassengerRequest)
    passenger: PassengerRequest[];
  
  }
  
  export class CarSlotRequest {
    @IsNotEmpty()
    @IsNumber()
    scheduleId: number;

    @IsNotEmpty()
    @IsNumber()
    totalSeat: number;
  }
  
  export class PassengerRequest {
    @IsNotEmpty()
    @IsNumber()
    passengerId: number;
  }