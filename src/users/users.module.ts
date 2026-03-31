import { Module } from "@nestjs/common";
import { UserController } from "./users.controller";
import { UserService } from "./users.service";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./users.schema";
import { DB_Service } from "src/DB/db.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UserController],
    providers: [DB_Service,UserService],
})

export class UserModule{

}