import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, BelongsTo, Column, Default, ForeignKey, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';
import { Agent } from './Agent';
import { Car } from './Car';
import { Transit } from './Transit';

interface IModelOptional {
  scheduleId: number;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  agentId: number;
  carId: number;
  boardingTime: Date;
  boardingTransitId: number;
  arrivalTime: Date;
  arrivalTransitId: number;
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
  tableName: 'schedules',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Schedule
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'schedule_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  scheduleId?: number;

  @AllowNull(false)
  @Column({ field: 'agent_id' })
  agentId: number;

  @AllowNull(false)
  @Column({ field: 'car_id' })
  carId: number;

  @AllowNull(false)
  @Column({ field: 'boarding_time' })
  boardingTime: Date;

  @AllowNull(false)
  @ForeignKey(() => Transit)
  @Column({ field: 'boarding_transit_id' })
  boardingTransitId: number;

  @AllowNull(false)
  @Column({ field: 'arrival_time' })
  arrivalTime: Date;

  @AllowNull(false)
  @Column({ field: 'arrival_transit_id' })
  arrivalTransitId: number;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

  @BelongsTo(() => Transit, {
    foreignKey : 'boardingTransitId',
    targetKey : 'transitId'
  })
  boardingTransit : Transit;
  
  @BelongsTo(() => Transit, {
    foreignKey : 'arrivalTransitId',
    targetKey : 'transitId'
  })
  arrivalTransit : Transit;

  @BelongsTo(() => Agent, 'agent_id')
  agent : Agent;

  @BelongsTo(() => Car, 'car_id')
  car : Car;
}
