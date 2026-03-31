import { Module } from "@nestjs/common";
import { DB_Service } from "./db.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";
import config from "config/config.service";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
            uri: config().DB_URL
        }),
        }),
    ],
    providers:[DB_Service],
    exports:[DB_Service]
})

export class DB_Module{}