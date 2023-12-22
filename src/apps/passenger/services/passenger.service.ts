import {Injectable, NotFoundException } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import * as moment from 'moment';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';
import { PassengerRequest } from '../requests/passenger.request';
import { Passenger } from '@models/core/Passenger';
import { PassengerListViewModel, PassengerViewModel } from '../viewmodels/pasengger.viewmodel';
import { generateViewModel } from '@utils/helper';
import CONST from '@utils/constant';

@Injectable()
export class PassengerService {
    constructor(
        private readonly sequelize: Sequelize,
    ) {}

    async listPassenger(user : ILoggedUser) : Promise<PassengerListViewModel[]>{
        const passenger = await Passenger.findAll({
            where : {
                userId : user.userId,
                isDeleted : false
            }
        })
        return generateViewModel(PassengerListViewModel, passenger)
    }

    async detailPassenger(passengerId : number, user: ILoggedUser) : Promise<PassengerViewModel>{
        const passenger = await Passenger.findOne({
            where : {
                passengerId : passengerId,
                userId : user.userId,
                isDeleted : false
            },
            rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_PASSENGER_NOT_FOUND)
        });

        return generateViewModel(PassengerViewModel, passenger);
    }

    async create(body : PassengerRequest, user : ILoggedUser) : Promise<PassengerViewModel>{
        const passenger = await Passenger.create({
            userId : user.userId,
            name : body.name,
            phone : body.phone,
            createdAt : new Date()
        })

        return generateViewModel(PassengerViewModel, passenger)
    }

    async delete(passengerId : number, user : ILoggedUser){
        const passenger = await Passenger.findOne({
            where : {
                passengerId : passengerId,
                userId : user.userId,
                isDeleted : false
            },
            rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_PASSENGER_NOT_FOUND)
        });

        await passenger.update({
            isDeleted : true,
            updatedAt : new Date()
        })

        return true
    }
}