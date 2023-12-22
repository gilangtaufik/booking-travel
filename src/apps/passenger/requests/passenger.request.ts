import { IsNotEmpty, IsString } from "class-validator";

export class PassengerRequest {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
  }