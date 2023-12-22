import { AuthConfigService } from '@config/auth/config.provider';
import { User } from '@models/core/User';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import CONST, {AUTH } from '@utils/constant';
import * as fs from 'fs';
import { AuthProvider } from '_common/auth/provider.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { ILoginPayload } from '../interface/login.interface';
import { AuthService } from '../services/auth.service';
import { ILoggedUser } from '../interface/logged.user.interface';

@Injectable()
export class AuthJwtStrategy extends PassportStrategy(Strategy, 'app-auth') {
  constructor(
    private readonly authProvider: AuthProvider,
    private readonly authConfig: AuthConfigService,
    private readonly configService: ConfigService,
    private readonly sequelize: Sequelize,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      algorithms: authConfig.algorithm,
      audience: authProvider.encrypt(AUTH.AUDIENCE_APP),
      issuer: configService.get('app.name'),
      secretOrKey: fs.readFileSync(`${authConfig.keyFolderPath}${authConfig.public}`),
    });
  }

  async validate(payload: ILoginPayload): Promise<ILoggedUser> {
    const userLogin = await User
      .findOne({
        attributes: ['userId', 'email', 'phone', 'firstName', 'lastName'],
        where: {
          isDeleted: false,
          userId: payload.userId,
        },
        rejectOnEmpty: new UnauthorizedException(),
      });

    return {
      userId: userLogin.userId,
      email: userLogin.email,
      phone: userLogin.phone,
      firstName: userLogin.firstName,
      lastName: userLogin.lastName,
    } as ILoggedUser;
    } 
}