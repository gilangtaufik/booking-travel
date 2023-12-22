import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';
import { IsOptional } from 'class-validator';

interface IModelOptional {
  userId : number
  passengerId : number;
  phone: string;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  name: string;
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
  tableName: 'passengers',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Passenger
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'passenger_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  passengerId?: number;

  @AllowNull(false)
  @Column({ field: 'user_id' })
  userId: number;

  @AllowNull(false)
  @Column({ field: 'name' })
  name: string;

  @Column({ field: 'phone' })
  phone: string;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

}
