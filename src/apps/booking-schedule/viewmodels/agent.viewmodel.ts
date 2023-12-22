import { Expose, Transform } from 'class-transformer';
import * as moment from 'moment';

export class AgentViewModel {
  @Expose()
  name: string;

  @Expose()
  address: string;
}
