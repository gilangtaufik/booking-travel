import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';

interface IModelOptional {

}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  bookingId: number;
  userId: number;
  passengerId: number;
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
  tableName: 'booking_details',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class BookingDetail
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'booking_detail_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  bookingDetailId?: number;

  @AllowNull(false)
  @Column({ field: 'booking_id' })
  bookingId: number;

  @AllowNull(false)
  @Column({ field: 'user_id' })
  userId: number;

  @AllowNull(false)
  @Column({ field: 'passenger_id' })
  passengerId: number;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

}
