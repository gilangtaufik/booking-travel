import { Agent } from '@models/core/Agent';
import { Car } from '@models/core/Car';
import { Schedule } from '@models/core/Schedule';
import { Injectable, NotFoundException } from '@nestjs/common';
import { circularToJSON, generateViewModel } from '@utils/helper';
import { FindOptions } from 'sequelize';
import { ScheduleViewModel } from '../viewmodels/schedule.viewmodel';
import CONST from '@utils/constant';
import { ScheduleCreateRequest, ScheduleUpdateRequest } from '../requests/schedule.request';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';
import { Transit } from '@models/core/Transit';
import { City } from '@models/core/City';

@Injectable()
export class ScheduleService {
 
    async index(filter: FindOptions){
        const {count, rows} = await Schedule.findAndCountAll(filter);

        return {
            count,
            rows: generateViewModel(ScheduleViewModel, circularToJSON(rows))
        }
    }

    async getDetail(scheduleId: number){
        const detail = await Schedule.findOne({
            include: [
                {
                    model : Agent,
                    attributes: ['name', 'address']
                },
                {
                    model : Car,
                    attributes: ['name','type','class']
                },
                {
                    model : Transit,
                    as : 'boardingTransit',
                    attributes : ['transitId', 'namePlace'],
                    include : [
                        {
                            model : City,
                            attributes : ['cityId', 'cityName']
                        }
                    ]
                },
                {
                    model : Transit,
                    as : 'arrivalTransit',
                    attributes : ['transitId', 'namePlace'],
                    include : [
                        {
                            model : City,
                            attributes : ['cityId', 'cityName']
                        }
                    ]
                }
            ],
            where :{
                scheduleId : scheduleId
            }
        })
        
        if (!detail) throw new NotFoundException(CONST.errorMessage.ERR_DATA_SCHEDULE_NOT_FOUND); 
        // return detail
        return generateViewModel(ScheduleViewModel, detail);
    }

    
    async create(body: ScheduleCreateRequest, user : ILoggedUser){
        return Schedule.create({
            carId : body.carId,
            agentId : body.agentId,
            boardingTime : new Date(body.boardingTime),
            boardingTransitId : body.boardingTransitId,
            arrivalTime : new Date(body.arrivalTime),
            arrivalTransitId : body.arrivalTransitId,
            createdAt : new Date()
        });
    }
    
    async update(scheduleId: number, body: ScheduleUpdateRequest){
        const schedule = await Schedule.findOne({where : {scheduleId}})
        if (!schedule) throw new NotFoundException(CONST.errorMessage.ERR_DATA_SCHEDULE_NOT_FOUND); 

        schedule.carId = body.carId;
        schedule.agentId = body.agentId;
        schedule.boardingTime = new Date(body.boardingTime),
        schedule.boardingTransitId = body.boardingTransitId,
        schedule.arrivalTime = new Date(body.arrivalTime),
        schedule.arrivalTransitId = body.arrivalTransitId,
        schedule.updatedAt = new Date();
        await schedule.save();

        return schedule
    }
    
}
