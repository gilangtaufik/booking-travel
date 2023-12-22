import { Expose } from 'class-transformer';

export class PassengerViewModel {
  @Expose()
  passengerId: number;

  @Expose()
  userId: number;

  @Expose()
  name: string;

  @Expose()
  phone: string;

}

export class PassengerListViewModel extends PassengerViewModel {}
