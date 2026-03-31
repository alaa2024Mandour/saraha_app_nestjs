import { Module } from "@nestjs/common";
import { DB_Service } from "./db.service";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigService } from "@nestjs/config";

@Module({
    imports:[
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
            uri: configService.get<string>('DB_URI'),
        }),
        }),
    ],
    providers:[DB_Service],
    exports:[DB_Service]
})

export class DB_Module{}