import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, BelongsTo, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';
import { User } from './User';
import { Schedule } from './Schedule';

interface IModelOptional {
  bookingId : number;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  userId: number;
  scheduleId: number;
  dateReservation: Date;
  statusPayment : string;
  referencePaymentCode:string;
}

export type IModelCreate = IModel & Partial<IModelOptional>;

@Scopes(() => ({
  active: ({
    where: {
      isDeleted: false,
    },
  }),
}))
@Table({
  tableName: 'bookings',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Booking
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'booking_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  bookingId?: number;

  @AllowNull(false)
  @Column({ field: 'user_id' })
  userId: number;

  @AllowNull(false)
  @Column({ field: 'schedule_id' })
  scheduleId: number;

  @AllowNull(false)
  @Column({ field: 'date_reservation' })
  dateReservation: Date;
  
  @AllowNull(false)
  @Column({ field: 'status_payment' })
  statusPayment: string;
  
  @AllowNull(false)
  @Column({ field: 'reference_payment_code' })
  referencePaymentCode: string;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

  @BelongsTo(() => Schedule, 'scheduleId')
  schedule : Schedule;

  @BelongsTo(() => User, 'userId')
  user : User;

  
}
