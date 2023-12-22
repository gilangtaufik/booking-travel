import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, BelongsToMany, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';
import { Schedule } from './Schedule';

interface IModelOptional {
  carId : number;
  agentId : number;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  name: string;
  type: string;
  class: string;
  totalSeat: number;
  desc: string;
  isActive: boolean;
}

export type IModelCreate = Omit<IModel,'isActive'> & Partial<IModelOptional>;

@Scopes(() => ({
  active: ({
    where: {
      isDeleted: false,
    },
  }),
}))
@Table({
  tableName: 'cars',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Car
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'car_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  carId?: number;

  @AllowNull(false)
  @Column({ field: 'agent_id' })
  agentId: number;

  @AllowNull(false)
  @Column({ field: 'name' })
  name: string;

  @AllowNull(false)
  @Column({ field: 'type' })
  type: string;

  @AllowNull(false)
  @Column({ field: 'class' })
  class: string;

  @AllowNull(false)
  @Column({ field: 'total_seat' })
  totalSeat: number;
  
  @AllowNull(false)
  @Column({ field: 'desc' })
  desc: string;

  @AllowNull(false)
  @Default(false)
  @Column({ field: 'is_active' })
  isActive: boolean;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;
}
