import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { BullModule } from '@nestjs/bullmq';
import { EMailProcessor } from 'src/common/processors/email.processor';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Global() 
@Module({
  imports:[
    ConfigModule,
    BullModule.registerQueue(
      {
        name: 'mail-queue',
        defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false, // ممكن تسيب الفاشلين عشان تصلحهم
        },
      },
    ),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST') || 'redis',
          port: config.get<number>('REDIS_PORT') || 6379,
        },
  }),
}),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const client = new Redis({
          host: configService.get<string>('REDIS_HOST') || '127.0.0.1',
          port: configService.get<number>('REDIS_PORT') || 6379,
        });

        client.on('error', (err) => console.error('Redis Error', err));
        client.on('connect', () => console.log('Successfully connected to Redis!'));
        return client;
      },
    },
    RedisService,
    EMailProcessor,
  ],
  exports: ['REDIS_CLIENT', RedisService, BullModule],
})
export class RedisModule {}