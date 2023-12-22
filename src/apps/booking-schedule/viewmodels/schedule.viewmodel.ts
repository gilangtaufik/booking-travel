import { Expose, Transform } from 'class-transformer';
import * as moment from 'moment';
import { AgentViewModel } from './agent.viewmodel';
import { CarViewModel } from './car.viewmodel';

export class City{
  @Expose()
  cityId : number

  @Expose()
  cityName : string
}
export class TransitViewModel {
  @Expose()
  transitId: string;

  @Expose()
  namePlace: string;

  @Expose()
  city: City;
}


export class ScheduleViewModel {
  @Expose()
  scheduleId: number;

  @Expose()
  agentId: number;

  @Expose()
  carId: number;

  @Expose()
  @Transform(({ obj }) => moment(obj.boardingTime).format('YYYY-MM-DD HH-mm-ss'))
  boardingTime: string;

  @Expose()
  @Transform(({ obj }) => moment(obj.arrivalTime).format('YYYY-MM-DD HH-mm-ss'))
  arrivalTime: string;

  @Expose()
  boardingTransit : TransitViewModel

  @Expose()
  agent : AgentViewModel
  
  @Expose()
  arrivalTransit : TransitViewModel

  @Expose()
  car : CarViewModel
}

export class ScheduleListViewModel extends ScheduleViewModel {}
