import {
    Body,
    Controller, Delete, Get, HttpCode, Param, Post, Put, UseGuards, UseInterceptors,
  } from '@nestjs/common';
import { BookingRequest } from '../requests/booking.request';
import { BookingService } from '../services/booking.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@utils/decorators/user.decorator';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';
import { CustomTransformInterceptor } from '@utils/interceptors';
import { BookingCreateViewModel } from '../viewmodels/booking.viewmodel';
import { ParseIntPipe } from '@nestjs/common';
  
  @UseGuards(AuthGuard('app-auth'))
  @Controller({version : '1', path: 'app/booking'})
  export class BookingController {
    constructor(private readonly bookingService: BookingService) {}
  
    @Post('/')
    @UseInterceptors(CustomTransformInterceptor)
    async bookingTravel(
        @Body() body: BookingRequest,
        @User() user : ILoggedUser
    ):Promise<BookingCreateViewModel> {
      return this.bookingService.booking(body, user);
    }
    
    @Get('/:bookingId')
    @UseInterceptors(CustomTransformInterceptor)
    async bookingTravelDetail(
      @Param('bookingId', ParseIntPipe) bookingId: number,
      @User() user : ILoggedUser
    ):Promise<BookingCreateViewModel> {
      return this.bookingService.detail(bookingId, user);
    }

    @Put('/:bookingId/cancel')
    @UseInterceptors(CustomTransformInterceptor)
    async bookingTravelCancel(
      @Param('bookingId', ParseIntPipe) bookingId: number,
      @User() user : ILoggedUser
    ){
      return this.bookingService.cancelBooking(bookingId, user);
    }

    @Put('/:bookingId/confirm')
    @UseInterceptors(CustomTransformInterceptor)
    async bookingTravelConfirmPayment(
      @Param('bookingId', ParseIntPipe) bookingId: number,
      @User() user : ILoggedUser
    ){
      return this.bookingService.confirmPayment(bookingId, user);
    }

    @Put('/:bookingId/confirm-admin')
    @UseInterceptors(CustomTransformInterceptor)
    async bookingTravelConfirmAdmin(
      @Param('bookingId', ParseIntPipe) bookingId: number,
      @User() user : ILoggedUser
    ){
      return this.bookingService.confirmPaymentAdmin(bookingId, user);
    }
  }
  