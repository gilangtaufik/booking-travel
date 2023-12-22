import { Migration } from '@config/database/migration.provider';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('agents', {
      agent_id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name : {
        type : DataType.STRING,
        allowNull : false
      },
      address : {
        type : DataType.STRING,
        allowNull : false
      },
      email : {
        type : DataType.STRING,
        allowNull : false
      },
      phone : {
        type : DataType.STRING,
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
    await queryInterface.dropTable('agents');
  });
};