import sequelize  from 'sequelize';
import { BaseFilter } from '@utils/base-class/base.filter';
import { FindOptions, Op } from 'sequelize';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ScheduleFilterQuery } from '../requests/schedule.request';
import { Agent } from '@models/core/Agent';
import { Car } from '@models/core/Car';
import { Transit } from '@models/core/Transit';
import { City } from '@models/core/City';

class Filter extends BaseFilter {
  constructor(
    query: ScheduleFilterQuery,
  ) {
    super(query);
    this.includeSchedule();
    this.where = {};
    if (query.carId) {
      this.searchByCarId(query.carId);
    }
    if (query.agentId) {
      this.searchByAgentId(query.agentId);
    }
    if(query.boardingDate){
      this.searchByBoardingDate(query.boardingDate)
    }
    if(query.boardingTransit){
      this.searchByBoardingTransit(query.boardingTransit)
      
    }


  }

 
  searchByCarId(carId: number) {
    this.where = {
      ...this.where,
      carId : carId
    };

    return this;
  }

  searchByAgentId(agentId: number) {
    this.where = {
      ...this.where,
      agentId : agentId
    };

    return this;
  }

  searchByBoardingDate(search : string){
    this.where = {
      [Op.or] : [
        sequelize.where(sequelize.literal('to_char("Schedule"."boarding_time", \'YYYY-MM-DD\')'),{
          [Op.eq] : search
        })
      ]
    }
    return this
  }

  searchByBoardingTransit(search : string){
    this.where = {
      [Op.or] : [
        sequelize.where(sequelize.literal('"boardingTransit"."name_place"'),{
          [Op.iLike] : `%${search}%`
        })
      ]
    }
    return this
  }


  includeSchedule() {
    this.include = [
      ...this.include,
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
    ];

    return this;
  }



}

export const ScheduleListFilter = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): FindOptions => {
    const request = ctx.switchToHttp().getRequest();

    return new Filter(request.query);
  },
);
