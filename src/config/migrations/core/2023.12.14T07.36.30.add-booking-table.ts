import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('bookings', {
      booking_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
      },
      user_id : {
        type : DataType.INTEGER,
        allowNull :false
      },
      schedule_id : {
        type : DataType.INTEGER,
        allowNull :false
      },
      date_reservation : {
        type : DataType.DATE,
        allowNull :false
      },
      status_payment : {
        type : DataType.STRING,
        allowNull :false
      },
      reference_payment_code : {
        type : DataType.STRING,
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
    await queryInterface.dropTable('bookings');
  });
};