import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserService } from "./users.service";
import { ZodValidationPipe } from "src/common/validation/zod.validation";
import { signIn_schema, signUp_schema } from "./user.validationData";
import type { signIn_DTO, signUp_DTO } from "./user.validationData";

@Controller("users")
export class UserController{

    constructor(private userService : UserService){}

    @Post("/signUp")
    @UsePipes(new ZodValidationPipe(signUp_schema))
    async sign_up(@Body() data : signUp_DTO){
        return await this.userService.signUp(data)
    }

    @Post("/signIn")
    @UsePipes(new ZodValidationPipe(signIn_schema))
    async sign_In(@Body() data : signIn_DTO){
        return await this.userService.signIn(data)
    }
}