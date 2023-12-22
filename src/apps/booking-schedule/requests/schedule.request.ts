import { PaginationRequest } from '@utils/requests/pagination.request';
import {
    IsDate,
  IsIn,
  IsNotEmpty, IsNumber, IsOptional, IsString, Length,
} from 'class-validator';

export class ScheduleFilterQuery extends PaginationRequest {
  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  carId?: number;

  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  agentId?: number;

  @IsOptional()
  @IsString()
  boardingDate?: string;

  @IsOptional()
  @IsString()
  boardingTransit?: string;

}
  export class ScheduleCreateRequest {
    @IsNotEmpty()
    @IsNumber()
    agentId: number;
  
    @IsNotEmpty()
    @IsNumber()
    carId: number;
  
    @IsNotEmpty()
    @IsString()
    boardingTime: string;
  
    @IsNotEmpty()
    @IsNumber()
    boardingTransitId: number;

    @IsNotEmpty()
    @IsString()
    arrivalTime: string;
    
    @IsNotEmpty()
    @IsNumber()
    arrivalTransitId: number;
  }
  
  export class ScheduleUpdateRequest extends ScheduleCreateRequest {}