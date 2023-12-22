import { Expose, Transform } from 'class-transformer';
import * as moment from 'moment';

export class CarViewModel {
  @Expose()
  car: string;

  @Expose()
  type: string;

  @Expose()
  class: string;
}
