import { Body, Controller, Get, Param, Post, Request, UseGuards, UseInterceptors, UsePipes } from "@nestjs/common";
import { UserService } from "./users.service";
import { ZodValidationPipe } from "src/common/validation/zod.validation";
import { signIn_schema, signUp_schema, userId_schema } from "./user.validationData";
import type { signIn_DTO, signUp_DTO, userId_DTO } from "./user.validationData";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/authorization.role.guard";
import { Roles } from "src/common/decotators/roles.decorator";
import { RoleEnum } from "src/common/enum/user.enum";
import { LoggingInterceptor } from "src/common/interceptors/logging.interceptor";

@UseInterceptors(LoggingInterceptor)
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


    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        console.log(req.user._id);
        
        return await this.userService.getMyProfile(req.user._id)
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(RoleEnum.admin)
    @Get('profile/:id')
    async getUserProfileById(@Request() req, @Param(new ZodValidationPipe(userId_schema)) id:userId_DTO) {
        console.log(req.user._id);
        
        return await this.userService.getUserById(id)
    }
}