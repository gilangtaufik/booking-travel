import { IUnfilledAtt, IUnfilledBy } from '@utils/base-class/base.interface';
import {
  AllowNull, AutoIncrement, BelongsTo, Column, Default, HasMany, HasOne, PrimaryKey, Scopes, Table,
} from 'sequelize-typescript';
import { Model } from 'base-repo';

interface IModelOptional {
  agentId : number
}

export interface IModel extends Partial<IUnfilledAtt>, Partial<IModelOptional>, Partial<IUnfilledBy> {
  name: string;
  address: string;
  email: string;
  phone: string;
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
  tableName: 'agents',
  indexes: [{ fields: ['is_deleted'] }],
  timestamps: false,
})
export class Agent
  extends Model<IModel, IModelCreate>
  implements IModel {
  @PrimaryKey
  @Column({
    field: 'agent_id',
    autoIncrement: true,
    autoIncrementIdentity: true,
    primaryKey: true,
  })
  agentId?: number;

  @AllowNull(false)
  @Column({ field: 'name' })
  name: string;

  @AllowNull(false)
  @Column({ field: 'address' })
  address: string;

  @AllowNull(false)
  @Column({ field: 'email' })
  email: string;

  @AllowNull(false)
  @Column({ field: 'phone' })
  phone: string;

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
