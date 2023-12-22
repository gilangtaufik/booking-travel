import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull : false
      },
      email : {
        type : DataType.STRING,
        allowNull :false
      },
      password : {
        type : DataType.STRING,
        allowNull :false
      },
      first_name : {
        type : DataType.STRING,
        allowNull :false
      },
      last_name : {
        type : DataType.STRING,
        allowNull :true
      },
      phone : {
        type : DataType.STRING,
        allowNull :true
      },
      address : {
        type : DataType.STRING,
        allowNull :true
      },
      city : {
        type : DataType.STRING,
        allowNull :true
      },
      state : {
        type : DataType.STRING,
        allowNull :true
      },
      postal_code : {
        type : DataType.STRING,
        allowNull :true
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
    await queryInterface.dropTable('users');
  });
};