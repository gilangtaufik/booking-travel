import {
    Body,
    Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors,
  } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@utils/decorators/user.decorator';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';
import { PassengerRequest } from '../requests/passenger.request';
import { PassengerService } from '../services/passenger.service';
import { PassengerListViewModel, PassengerViewModel } from '../viewmodels/pasengger.viewmodel';
import { CustomTransformInterceptor } from '@utils/interceptors';
import { ParseIntPipe } from '@nestjs/common';
  
  @UseGuards(AuthGuard('app-auth'))
  @Controller({version : '1', path: 'app/passenger'})
  export class PassengerController {
    constructor(private readonly passengerService: PassengerService) {}
    
    @Get('/')
    @UseInterceptors(CustomTransformInterceptor)
    async listPassenger(
        @User() user : ILoggedUser
    ): Promise<PassengerListViewModel[]> {
        return this.passengerService.listPassenger(user);
    }
    
    @Get('/:passengerId')
    @UseInterceptors(CustomTransformInterceptor)
    async detailPassenger(
        @Param('passengerId', ParseIntPipe) passengerId: number,
        @User() user : ILoggedUser
    ): Promise<PassengerViewModel> {
        return this.passengerService.detailPassenger(passengerId, user);
    }
    
    @Post('/')
    @UseInterceptors(CustomTransformInterceptor)
    async addPassenger(
        @Body() body: PassengerRequest,
        @User() user : ILoggedUser
    ): Promise<PassengerViewModel> {
      return this.passengerService.create(body, user);
    }
  
    @Delete('/:passengerId')
    @UseInterceptors(CustomTransformInterceptor)
    async deletePassenger(
        @Param('passengerId', ParseIntPipe) passengerId: number,
        @User() user : ILoggedUser
    ){
      return this.passengerService.delete(passengerId, user);
    }
  
  }
  