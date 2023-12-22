import { Match } from '@utils/decorators/match.validator';
import { PaginationRequest } from '@utils/requests/pagination.request';
import {
    IsDate,
  IsIn,
  IsNotEmpty, IsNumber, IsOptional, IsString, Length,
} from 'class-validator';

  export class RegisterRequest {
    @IsNotEmpty()
    @IsString()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @Match('password')
    confirmPassword: string;
  
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phone: string;
  
  }

  export class LoginRequest{
    @IsNotEmpty()
    @IsString()
    email : string;
    
    @IsNotEmpty()
    @IsString()
    password : string;


  }
  