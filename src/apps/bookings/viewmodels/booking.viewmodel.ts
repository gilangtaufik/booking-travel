import { Expose, Transform, Type } from "class-transformer";

export class BookingCreateViewModel {
    @Expose()
    bookingId: number;
  
    @Expose()
    referencePaymentCode: string;
  }

class User {
    @Expose()
    userId: number;
  
    @Expose()
    email: string;
  
    @Expose()
    firstName: string;
  
    @Expose()
    phone: string;
}

class Schedule {
    @Expose()
    scheduleId : number;

    @Expose()
    boardingTime : string;

    @Expose()
    arrivalTime : string;

    @Expose()
    @Transform(({ obj }) => obj?.car?.name)
    carName: string;

    @Expose()
    @Transform(({ obj }) => obj?.car?.type)
    type : string;

    @Expose()
    @Transform(({ obj }) => obj?.car?.class)
    class : string;

    @Expose()
    @Transform(({ obj }) => obj?.car?.totalSeat)
    totalSeat : string;
}

export class DetailBookingViewModel extends BookingCreateViewModel {

    @Expose()
    statusPayment : string;

    @Expose()
    dateReservation : string;

    @Expose()
    @Type(() => User)
    user: User;

    @Expose()
    @Type(() => Schedule)
    schedule: Schedule;

    

}

