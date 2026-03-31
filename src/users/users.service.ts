import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from "mongoose";
import { DB_Service } from "src/DB/db.service";
import type { signUp_DTO } from "./user.validationData";

@Injectable()
export class UserService{
    constructor(private dbService:DB_Service, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    public async signUp(data : signUp_DTO){
        try {
            const user = await this.dbService.create({
            model:this.userModel,
            data
            })

            return({Message:"user created successfully",user})
        } catch (error) {
            throw new HttpException({Message:"Faild to signUp",Error:error.message},HttpStatus.FORBIDDEN) 
        }
    }
}