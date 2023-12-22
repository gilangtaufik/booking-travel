import { Migration } from '@config/database/migration.provider';
import { Agent } from '@models/core/Agent';
import { Car } from '@models/core/Car';
import { City } from '@models/core/City';
import { Passenger } from '@models/core/Passenger';
import { Schedule } from '@models/core/Schedule';
import { Transit } from '@models/core/Transit';
import { User } from '@models/core/User';
import { DataType } from 'sequelize-typescript';

export const databasePath = __dirname;

export const up: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    let arrival = new Date().getTime() + (1 * 60 * 60 * 1000);

    Promise.all([
      User.bulkCreate([
        {email : 'gilang@mail.com', password : "$2a$08$HD1f5X08FlwPzAbz2qbdWe6pTAuFUWxc6UeeaMakC8xAjAAAfNmX.", firstName : 'gilang', createdAt : new Date()}
      ]),
      Passenger.bulkCreate([
        {userId : 1, name : "Gilang", phone: "08999999", createdAt : new Date()},
        {userId : 1, name : "Taufik", phone: "08999999", createdAt : new Date()},
      ]),
      Agent.bulkCreate([
        {name : 'Agent A', address : 'Jalan Soekarno Hatta', email: 'agent1@mail.com', phone : "0899999999", createdAt : new Date()},
        {name : 'Agent B', address : 'Jalan Soekarno Hatta', email: 'agent2@mail.com', phone : "0899999999", createdAt : new Date()},
        {name : 'Agent C', address : 'Jalan Soekarno Hatta', email: 'agent3@mail.com', phone : "0899999999", createdAt : new Date()},
      ]),
      Car.bulkCreate([
        {agentId : 1, name : 'Damri', class: "Ekonomi", type: 'Bus', totalSeat: 40, desc : 'Desc', createdAt : new Date()},
        {agentId : 1, name : 'MetroMini', class: "Ekonomi", type: 'Bus', totalSeat: 40, desc : 'Desc', createdAt : new Date()},
        {agentId : 1, name : 'Damri Premium', class: "Ekonomi", type: 'Bus', totalSeat: 40, desc : 'Desc', createdAt : new Date()},
      ]),
      City.bulkCreate([
        {cityName : 'Bandung'},
        {cityName : 'Jakarta'},
        {cityName : 'Yogyakarta'},
      ]),
      Transit.bulkCreate([
        {namePlace : 'Terminal Cicaheum', cityId : 1},
        {namePlace : 'Terminal Leuwi Panjang', cityId : 1},
        {namePlace : 'Terminal Tanjung Priok', cityId : 2},
        {namePlace : 'Terminal Ngibangan', cityId : 3},
        {namePlace : 'Terminal Pabean', cityId : 3},
      ]),
      Schedule.bulkCreate([
        {agentId : 1, carId : 1, boardingTime : new Date(), arrivalTime : new Date(arrival), createdAt : new Date(), boardingTransitId : 1, arrivalTransitId:4},
        {agentId : 1, carId : 2, boardingTime : new Date(), arrivalTime : new Date(arrival), createdAt : new Date(), boardingTransitId : 2, arrivalTransitId:5},
        {agentId : 1, carId : 3, boardingTime : new Date(), arrivalTime : new Date(arrival), createdAt : new Date(), boardingTransitId : 3, arrivalTransitId:1},
      ])
    ])
  });
};
export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.sequelize.transaction(async (transaction) => {
    // await queryInterface.dropTable('table_name');
  });
};