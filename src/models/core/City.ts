import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';

interface IModelOptional {
  cityId : number;
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  cityId? : number;
  cityName: string;
}

export type IModelCreate = Omit<IModel, 'cityId'> & Partial<IModelOptional>;

@Scopes(() => ({
  active: ({
    where: {
      isDeleted: false,
    },
  }),
}))
@Table({
  tableName: 'city',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class City
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'city_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  cityId?: number;

  @AllowNull(false)
  @Column({ field: 'name' })
  cityName: string;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

}
