import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('cars', {
      car_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      agent_id : {
        type : DataType.INTEGER,
        allowNull : false
      },
      name : {
        type : DataType.STRING,
        allowNull : false
      },
      type : {
        type : DataType.STRING,
        allowNull : false
      },
      class : {
        type : DataType.STRING,
        allowNull : false
      },
      total_seat : {
        type : DataType.INTEGER,
        allowNull : false
      },
      desc : {
        type : DataType.TEXT,
        allowNull : false
      },
      is_active : {
        type : DataType.BOOLEAN,
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
    await queryInterface.dropTable('cars');
  });
};