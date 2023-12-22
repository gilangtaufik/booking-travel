import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class PassengerRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    phone: string;
  }