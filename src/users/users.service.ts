import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./users.schema";
import { Model } from "mongoose";
import { DB_Service } from "src/DB/db.service";
import type { signIn_DTO, signUp_DTO } from "./user.validationData";
import { successRes } from "src/common/response_handeller/success_response";
import { Hash } from "src/common/security/hash.security";
import { EncrypService } from "src/common/security/encrypt.security";

@Injectable()
export class UserService{
    constructor(private encryptService : EncrypService,private dbService:DB_Service, @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    public async signUp(data : signUp_DTO){
        const {email,password,phone} = data
            const user_exist = await this.dbService.findOne({
                model:this.userModel,
                filter:{email}
            })

            if(user_exist){
                throw new HttpException({Message:"user already exist"},HttpStatus.BAD_REQUEST) 
            }

            const user = await this.dbService.create({
            model:this.userModel,
            data:{
                ...data,
                password:Hash({plainText:password}),
                phone:this.encryptService.encrypt(phone)
            }
            })

            return successRes("signUp successfully",user)
        } 

    public async signIn(data : signIn_DTO){
        const {email,password} = data
        
        const user = await this.dbService.findOne({
            model:this.userModel,
            filter:{
                email,
                password
            }
        }) 

        
        if(!user){
            throw new HttpException("email or password are wrong", HttpStatus.NOT_FOUND)
        }

        return successRes("signIn successfully")
    }

}