import { Schedule } from '@models/core/Schedule';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { circularToJSON, generateViewModel } from '@utils/helper';
import CONST from '@utils/constant';
import { LoginRequest, RegisterRequest } from '../requests/auth.request';
import { User } from '@models/core/User';
import { AuthProvider } from '_common/auth/provider.service';
import { AuthConfigService } from '@config/auth/config.provider';
import { ConfigService } from '@nestjs/config';
import { ILoggedUser } from '../interface/logged.user.interface';

// import { bcrypt } from 'bcryptjs'
import {AUTH} from '@utils/constant';
import { Passenger } from '@models/core/Passenger';
import { Sequelize } from 'sequelize-typescript';
const bcrypt = require('bcryptjs')

@Injectable()
export class AuthService {
    constructor(
        private readonly commonAuthProvider: AuthProvider,
        private readonly authConfig: AuthConfigService,
        private readonly sequelize: Sequelize,

      ) {
    
      }
    async checkEmail(email : string) {
        const checkMail = await User.findOne({
            where : {
                email : email
            }
        })
        return checkMail;
    }
    async register(body : RegisterRequest){
        const checkMail = await this.checkEmail(body.email)
        if(checkMail) throw new BadRequestException(CONST.errorMessage.ERR_DATA_USER_ALREADY_REGISTER);

        const password = await bcrypt.hashSync(body.password, 8);
        return this.sequelize.transaction(async (transaction) => {
          const user = await User.create({
              email : body.email,
              password : password,
              firstName : body.firstName,
              lastName : body?.lastName,
              createdAt : new Date()
          },{transaction})

          await Passenger.create({
            userId : user.userId,
            name : body.firstName,
            phone : body?.phone,
            createdAt : new Date()
          },{transaction})
        })
    }

    async login(body : LoginRequest ){
        const checkMail = await this.checkEmail(body.email)
        if(!checkMail) throw new BadRequestException(CONST.errorMessage.ERR_DATA_USER_NOT_FOUND);

        const compare = bcrypt.compareSync(body.password, checkMail.password)
        if(!compare) throw new BadRequestException(CONST.errorMessage.ERR_DATA_USER_NOT_FOUND);

        const iLoginPayload: ILoggedUser = {
            userId: checkMail.userId,
            email: checkMail.email,
            phone: checkMail.phone,
            firstName: checkMail.firstName,
            lastName: checkMail.lastName,
          };

        let token: {
            expiresIn: number, token: string
          } = {
            expiresIn: 60,
            token: '',
          };
    
            token = await this.commonAuthProvider.createToken({
              payload: iLoginPayload,
              key: this.authConfig.secret,
              audience: AUTH.AUDIENCE_APP,
            });
         
        return {user : iLoginPayload, token}
    }

    
}
