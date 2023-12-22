import { Schedule } from '@models/core/Schedule';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { circularToJSON, generateReference, generateViewModel } from '@utils/helper';
import { FindOptions, Op } from 'sequelize';
import CONST from '@utils/constant';
import { BookingRequest, CarSlotRequest } from '../requests/booking.request';
import { Agent } from '@models/core/Agent';
import { Booking } from '@models/core/Booking';
import { Car } from '@models/core/Car';
import { Passenger } from '@models/core/Passenger';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import * as moment from 'moment';
import { BookingDetail } from '@models/core/BookingDetail';
import { ILoggedUser } from '@apps/auth/interface/logged.user.interface';
import { BookingCreateViewModel, DetailBookingViewModel } from '../viewmodels/booking.viewmodel';
import { number } from 'joi';
import { User } from '@models/core/User';

@Injectable()
export class BookingService {
    constructor(
        private readonly sequelize: Sequelize,
    ) {}
 
    async booking(body : BookingRequest, user : ILoggedUser): Promise<BookingCreateViewModel>{
        const schedule = await Schedule.findOne({
            where : {
                scheduleId : body.scheduleId,
                isDeleted : false
            },
            include : [
                {
                    model : Car,
                    attributes : ['totalSeat']
                }
            ],
            rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_SCHEDULE_NOT_FOUND)
        })

        // Check slot seat
        const dataSlotDTO : CarSlotRequest = {
            scheduleId : body.scheduleId,
            totalSeat : +schedule?.car?.totalSeat - body.passenger.length,
        }
        await this.checkSlotCarAvailable(dataSlotDTO);
        
        let booking : any = {}
        await this.sequelize.transaction(async (transaction) => {
            booking = await Booking.create({
                userId : user.userId,
                scheduleId : body.scheduleId,
                statusPayment : CONST.payment.NOT_PAID,
                referencePaymentCode : `REF-${moment(new Date()).format('YYYYMMDD')}${generateReference(100000000000,999999999999).toString()}`,
                dateReservation : new Date(),
                createdAt : new Date()
            },
            {transaction});

            for await(let value of body.passenger){
                const passenger = await Passenger.findOne({
                    attributes : ['passengerId'],
                    where : {
                        passengerId : value.passengerId,
                        isDeleted : false
                    },
                    rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_PASSENGER_NOT_FOUND)
                })

                await BookingDetail.create({
                    bookingId : booking.bookingId,
                    userId : user.userId,
                    passengerId : value.passengerId,
                    createdAt : new Date()
                },
                {transaction})
            }
        })

        return generateViewModel(BookingCreateViewModel, booking)
    }

    async checkSlotCarAvailable(data : CarSlotRequest){
        const countBookingSchedule = await Booking.count({
            where : {
                scheduleId : data.scheduleId ,
                isDeleted : false
            }
        })
        
        if(countBookingSchedule >= data.totalSeat) throw new BadRequestException(CONST.errorMessage.ERR_DATA_TOTAL_SEAT_NOT_AVAILABLE)
        return true
    }

    async detail(bookingId : number, user : ILoggedUser): Promise<DetailBookingViewModel>{
        const booking = await Booking.findOne({
            where : {
                bookingId : bookingId,
                isDeleted : false
            },
            include : [
                {
                    model : User,
                },
                {
                    model : Schedule,
                    include : [
                        {
                            model: Car,
                        }
                    ]
                },
            ],
            rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_BOOKING_NOT_FOUND)
        })

        return generateViewModel(DetailBookingViewModel, booking)
    }

    async checkBooking(bookingId : number) {
        return await Booking.findOne({
            where : {
                bookingId : bookingId,
                isDeleted : false
            },
            rejectOnEmpty : new NotFoundException(CONST.errorMessage.ERR_DATA_BOOKING_NOT_FOUND)
        })
    }

    async cancelBooking(bookingId : number, user: ILoggedUser) {
        const checkBooking = await this.checkBooking(bookingId)
        if(checkBooking.statusPayment === CONST.payment.PAID) throw new BadRequestException(CONST.errorMessage.ERR_DATA_BOOKING_CANNOT_CANCEL)

        checkBooking.statusPayment = CONST.payment.CANCEL;
        checkBooking.isDeleted = true;
        await checkBooking.save();

        return true
    }

    async confirmPayment(bookingId : number, user: ILoggedUser) {
        const checkBooking = await this.checkBooking(bookingId)
        switch(checkBooking.statusPayment){
            case CONST.payment.PAID: 
                throw new BadRequestException(CONST.errorMessage.ERR_DATA_BOOKING_HAS_PAID);
            case CONST.payment.PENDING: 
                throw new BadRequestException(CONST.errorMessage.ERR_DATA_BOOKING_HAS_CHECK);
        }

        checkBooking.statusPayment = CONST.payment.PENDING;
        await checkBooking.save();

        return true
    }

    async confirmPaymentAdmin(bookingId : number, user: ILoggedUser) {
        const checkBooking = await this.checkBooking(bookingId)
        if(checkBooking.statusPayment == CONST.payment.PAID) throw new BadRequestException(CONST.errorMessage.ERR_DATA_BOOKING_HAS_PAID);

        checkBooking.statusPayment = CONST.payment.PAID;
        await checkBooking.save();

        return true
    }


}
