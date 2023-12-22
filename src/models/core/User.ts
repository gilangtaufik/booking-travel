import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';

interface IModelOptional {
    userId : number;
    lastName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    password: string
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  userId? : number;
  email: string;
  firstName: string;
}

export type IModelCreate = Omit<IModel, 'userId'> & Partial<IModelOptional>;

@Scopes(() => ({
  active: ({
    where: {
      isDeleted: false,
    },
  }),
}))
@Table({
  tableName: 'users',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class User
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'user_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  userId?: number;

  @AllowNull(false)
  @Column({ field: 'email' })
  email: string;

  @AllowNull(false)
  @Column({ field: 'password' })
  password: string;

  @AllowNull(false)
  @Column({ field: 'first_name' })
  firstName: string;

  @Column({ field: 'last_name' })
  lastName: string;

  @Column({ field: 'phone' })
  phone: string;

  @Column({ field: 'address' })
  address: string;

  @Column({ field: 'city' })
  city: string;

  @Column({ field: 'state' })
  state: string;

  @Column({ field: 'postal_code' })
  postalCode: string;

  @AllowNull(false)
  @Column({ field: 'created_at' })
  createdAt: Date;

  @Column({ field: 'updated_at' })
  updatedAt: Date;

  @Default(false)
  @Column({ field: 'is_deleted' })
  isDeleted: boolean;

}
