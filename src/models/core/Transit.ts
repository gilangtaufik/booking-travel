import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, Default, ForeignKey, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';
import { Schedule } from './Schedule';
import { City } from './City';

interface IModelOptional {
  transitId : number;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  transitId? : number;
  namePlace: string;
  cityId : number;
}

export type IModelCreate = Omit<IModel, 'transitId'> & Partial<IModelOptional>;

@Scopes(() => ({
  active: ({
    where: {
      isDeleted: false,
    },
  }),
}))
@Table({
  tableName: 'transit',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Transit
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @ForeignKey(() => Schedule)
  @Column({
    field: 'transit_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  transitId?: number;

  @AllowNull(false)
  @Column({ field: 'name_place' })
  namePlace: string;

  @AllowNull(false)
  @Column({ field: 'city_id' })
  cityId: number;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

  @BelongsTo(() => City,'cityId')
  city : City;
}
