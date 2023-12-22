import { UseGuards, applyDecorators } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

export function Authorize(){
    return applyDecorators(
        UseGuards(AuthGuard(['app-auth'])),
    );
}