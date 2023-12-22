import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('booking_details', {
      booking_detail_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      booking_id : {
        type : DataType.INTEGER,
        allowNull :false
      },
      user_id : {
        type : DataType.INTEGER,
        allowNull :false
      },
      passenger_id : {
        type : DataType.INTEGER,
        allowNull :false
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
    await queryInterface.dropTable('booking_details');
  });
};