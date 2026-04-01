import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.schema";
import { DB_Service } from "src/DB/db.service";
import { EncrypService } from "src/common/security/encrypt.security";
import { AuthModule } from "src/common/auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [EncrypService,DB_Service,UserService],
    exports:[UserService]
})

export class UserModule{

}