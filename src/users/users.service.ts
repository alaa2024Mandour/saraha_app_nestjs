import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../DB/models/users.model";
import { Model } from "mongoose";
import { DB_Service } from "src/DB/db.service";
import type { confirmEmail_DTO, signIn_DTO, signUp_DTO, userId_DTO } from "./user.validationData";
import { successRes } from "src/common/response_handeller/success_response";
import { Compare, Hash } from "src/common/security/hash.security";
import { EncrypService } from "src/common/security/encrypt.security";
import { AuthService } from "src/common/auth/auth.service";
import { RedisService } from "src/DB/redis/redis.service";
import { EmailService } from "src/common/email/email.service";
import { EmailEnum } from "src/common/enum/email.enum";

@Injectable()
export class UserService{
    constructor(
        private encryptService : EncrypService,
        private dbService:DB_Service, 
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private authService : AuthService,
        private redisService : RedisService,
        private emailService : EmailService
    ) {}

    private confirmed_ket (email:string){
        return `${EmailEnum.confirmeEmail}::otp::${email}`
    }

    private maxTries_ket (email:string){
        return `${EmailEnum.maxTries}::otp::${email}`
    }

    private generateOTP (){
    return Math.floor(Math.random() * 900000 + 100000);
};

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
            const OTP = this.generateOTP()
            await this.emailService.sendEmail({toEmail:email,otpCode:OTP});

            await this.redisService.set({
                key:this.confirmed_ket(email),
                value:await Hash({plainText:String(OTP)}),
                expireInSeconds:60
            });

            await this.redisService.set({
                key:this.maxTries_ket(email),
                value:1
            });
            
            return successRes("signUp successfully",user)
        } 


    public async confirmEmail (data : confirmEmail_DTO) {
    const { email, code } = data;

    const otpValue = await this.redisService.get(this.confirmed_ket(email));

    console.log(otpValue);
    console.log(this.confirmed_ket(email));
    
    if (!otpValue){
        throw new HttpException("otp expired",HttpStatus.BAD_REQUEST);
    }

    if (!Compare({ plainText: String(code), cipherText: String(otpValue) })) {
        throw new Error(" invalid otp ");
    }

    const user = await this.dbService.findOneAndUpdate({
        model: this.userModel,
        filter: {
            email:email.toLowerCase().trim(),
            confirmed: { $exists: false }
        },
        update: { $set: { confirmed: true } },
    });

    if (!user) {
        throw new Error(" user not exist ");
    }

    await this.redisService.del(this.confirmed_ket(email));
    return successRes("confirmed successfully");
};


    public async signIn(data : signIn_DTO){
        const {email,password} = data
        
        const user = await this.dbService.findOne({
            model:this.userModel,
            filter:{
                email
            }
        }) 

        if(!user){
            throw new HttpException("email or password are wrong", HttpStatus.NOT_FOUND)
        }

        console.log(user);
        
        if(user && !Compare({plainText:password,cipherText:user.password})){
            throw new HttpException("invalid password", HttpStatus.NOT_FOUND)
        }
        
        const token = await this.authService.generateToken({...user})
        return successRes("signIn successfully",token)
    }

    public async getMyProfile(id : string){
        const userExist = await this.dbService.findById({
            model:this.userModel,
            id
        })

        
        if(userExist){
            return successRes(
                "done",
                {
                    userName : userExist.first_name + " " + userExist.last_name,
                    email : userExist.email,
                    phone: this.encryptService.decrypt(userExist.phone),
                    gender:userExist.gender
                })
        }
    }

    public async getUserById(data : userId_DTO){
        const {id} = data
        const userExist = await this.dbService.findById({
            model:this.userModel,
            id
        })

        
        if(userExist){
            return successRes("done",userExist)
        }
    }
}