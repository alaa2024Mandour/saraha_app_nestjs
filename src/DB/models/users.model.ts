import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { GenderEnum, RoleEnum } from "src/common/enum/user.enum";

export type UserDocument = HydratedDocument<User>;
@Schema()
export class User{
    @Prop({
        required:true,
        minlength:2,
        trim:true
    })
    first_name:string;

    @Prop({
        required:true,
        minlength:2,
        trim:true
    })
    last_name:string

    @Prop({
        required:true,
        trim:true
    })
    email:string;

    @Prop({
        required:true,
        minlength:8,
        trim:true
    })
    password:string

    @Prop({
        required:true,
        trim:true
    })
    phone:string

    @Prop({
        enum:Object.values(GenderEnum),
        default:GenderEnum.male,
        trim:true
    })
    gender:string;

    @Prop()
    confirmed:boolean

    @Prop({
        enum:Object.values(RoleEnum),
        default:RoleEnum.user,
        trim:true
    })
    role:string;
}

export const UserSchema = SchemaFactory.createForClass(User);