import {
    Body,
    Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors,
  } from '@nestjs/common/decorators';
import { AuthService } from '../services/auth.service';
import { LoginRequest, RegisterRequest } from '../requests/auth.request';
import { CustomTransformInterceptor } from '@utils/interceptors';
  
  @Controller({version : '1', path: 'app/auth'})
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('/register')
    async register(
        @Body() body: RegisterRequest,
    ) {
      return this.authService.register(body);
    }

    
    @Post('/')
    @UseInterceptors(CustomTransformInterceptor)
    async login(
        @Body() body: LoginRequest,
    ) {
      return this.authService.login(body);
    }

    
  
  }
  