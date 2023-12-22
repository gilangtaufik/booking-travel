import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('schedules', {
      schedule_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      agent_id : {
        type : DataType.INTEGER,
        allowNull : false
      },
      car_id : {
        type : DataType.INTEGER,
        allowNull : false
      },
      boarding_time : {
        type : DataType.DATE,
        allowNull : false
      },
      boarding_transit_id : {
        type : DataType.INTEGER,
        allowNull : false
      },
      arrival_time : {
        type : DataType.DATE,
        allowNull : false
      },
      arrival_transit_id : {
        type : DataType.INTEGER,
        allowNull : false
      },
      created_at: DataType.DATE,
      updated_at: DataType.DATE,
      is_deleted: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    });
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('schedules');
  });
};