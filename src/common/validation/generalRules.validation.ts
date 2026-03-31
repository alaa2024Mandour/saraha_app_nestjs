import * as z from "zod"; 
import { GenderEnum } from "../enum/user.enum";
import { Types } from "mongoose";

export const general_rules = {
    userName: z.string().min(2).max(50),

    first_name: z.string().min(2).max(50),

    last_name: z.string().min(2).max(50),

    email: z.email(),

    password: z
        .string()
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            {message:"Invalid passwords , must contain numbers , lower and upper letters and spetial characters "}
        ),


    cPassword: z.string(),

    phone: z
        .string()
        .regex(
            /^(01|02001|\+201)[0125][0-9]{8}$/,
            {message: "Invalid phone number"}
        )
        ,

    gender: z.enum(Object.values(GenderEnum)).default("male"),

    id: z.string().refine((value) => Types.ObjectId.isValid(value), { //custom validation
        message: "Invalid MongoDB ObjectId structure", 
    }),

    file: z
        .object({
            fieldname: z.string(),
            originalname: z.string(),
            encoding: z.string(),
            mimetype: z.string(),
            destination: z.string(),
            filename: z.string(),
            path: z.string(),
            size: z.number(),
        })
};
