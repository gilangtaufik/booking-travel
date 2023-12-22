import {
  Body,
  Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors,
} from '@nestjs/common/decorators';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { AppService } from '../../../app.service';
import { CustomTransformInterceptor, ResponsePaginationInterceptor } from '@utils/interceptors';
import { ScheduleService } from '../services/schedule.service';
import { ScheduleListFilter } from '../filters/schedule.filter';
import { FindOptions } from 'sequelize';
import { ScheduleListViewModel } from '../viewmodels/schedule.viewmodel';
import { ScheduleCreateRequest, ScheduleUpdateRequest } from '../requests/schedule.request';
import { AuthGuard } from '@nestjs/passport';
import { Authorize } from '@utils/decorators/authorize.decorator';
import { User } from '@utils/decorators/user.decorator';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';

@UseGuards(AuthGuard('app-auth'))
@Controller({version : '1', path: 'app/schedule'})
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('/')
  @UseInterceptors(ResponsePaginationInterceptor)

  async index(@ScheduleListFilter() filter: FindOptions) {
    return this.scheduleService.index(filter);
  }

  @Get('/:scheduleId')
  @UseInterceptors(CustomTransformInterceptor)
  async detail(
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
  ){
    return this.scheduleService.getDetail(scheduleId);
  }

  @Post('/')
  @UseInterceptors(CustomTransformInterceptor)
  async create(
    @Body() body: ScheduleCreateRequest,
    @User() auth: ILoggedUser
  ){
    return this.scheduleService.create(body, auth);
  }

  @Put('/:scheduleId')
  @UseInterceptors(CustomTransformInterceptor)
  async update(
    @Param('scheduleId', ParseIntPipe) scheduleId: number,
    @Body() body: ScheduleUpdateRequest,
  ){
    return this.scheduleService.update(scheduleId, body);
  }
}
