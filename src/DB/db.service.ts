import { Injectable } from "@nestjs/common";
import { DeleteResult, Model, ModifyResult, UpdateWriteOpResult } from "mongoose";

@Injectable()

export class DB_Service{
        public async create <T> ({model,data}:{model:Model<T> , data:any }) : Promise<T>{
            return await model.create(data);
        }

        public async find <T> ({model,filter,options}:{model:Model<T>,filter?:any,options?:any}) : Promise<T[]> {
        const doc = model.find(filter)
        //if you want to make skip , limit , populate , ... 
        if(options?.populate){
            doc.populate(options.populate)
        }
        if(options?.skip){
            doc.skip(options.skip)
        }
        if(options?.limit){
            doc.limit(options.limit)
        }
        if(options?.sort){
            doc.limit(options.sort)
        }
        return await doc.exec();
    }

    public async findOne <T> ({model,filter,options}:{model:Model<T>,filter?:any,options?:any}) : Promise<T | null> {
        const doc = model.findOne(filter)
        //if you want to make skip , limit , populate , ... 
        if(options?.populate){
            doc.populate(options.populate)
        }
        return await doc.exec();
    }


        public async findById <T> ({model,id,options}:{model:Model<T>,id:string | any,options?:any}) : Promise<T | null> {
        const doc = model.findById(id)
        //if you want to make skip , limit , populate , ... 
        if(options?.populate){
            doc.populate(options.populate)
        }
        return await doc.exec();
    }

    public async updateOne <T>  ({model,filter,update,options}:{model:Model<T>, filter:any , update:any ,options?:any}) : Promise<UpdateWriteOpResult> {
        const doc = model.updateOne(filter,update,{runValidator:true , ...options})
        return await doc.exec();
    }


    public async findOneAndUpdate <T>  ({model,filter,update,options}:{model:Model<T>, filter:any , update:any ,options?:any}) : Promise<ModifyResult<T>> {
        const doc = model.findOneAndUpdate(filter,update,{new:true , runValidator:true , ...options})
        return await doc.exec();
    }


    public async deleteOne <T>  ({model,filter,options}:{model:Model<T>, filter:any ,options?:any}) : Promise<DeleteResult> {
        const doc = model.deleteOne(filter,options)
        return await doc.exec();
    }
}