import { general_rules } from "src/common/validation/generalRules.validation";
import * as z from "zod"; 

export const signUp_schema = z.object({ 
    first_name:general_rules.first_name,
    last_name:general_rules.last_name,
    password:general_rules.password,
    cPassword:general_rules.cPassword,
    email:general_rules.email,
    phone:general_rules.phone,
    gender:general_rules.gender,
    role:general_rules.role,
}).refine((data) => data.password === data.cPassword, {
        message: "Passwords do not match",
        path: ["cPassword"]
    });

export type signUp_DTO = z.infer<typeof signUp_schema>;



export const signIn_schema = z.object({ 
    password:z.string(),
    email:general_rules.email,
})
export type signIn_DTO = z.infer<typeof signIn_schema>;


export const userId_schema = z.object({ 
    id:general_rules.id
})
export type userId_DTO = z.infer<typeof userId_schema>;