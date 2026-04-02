import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';
import { BullModule } from '@nestjs/bullmq';
import { EMailProcessor } from 'src/common/processors/email.processor';

@Global() 
@Module({
  imports:[
    BullModule.registerQueue(
      {
        name: 'mail-queue',
        defaultJobOptions: {
        removeOnComplete: true,
        removeOnFail: false, // ممكن تسيب الفاشلين عشان تصلحهم
        },
      },
    ),
    BullModule.forRoot({
      connection: {
        host: '127.0.0.1',
        port: 6379,
      },
    }),
  ],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const client = new Redis({
          host: '127.0.0.1', // أو localhost
          port: 6379,
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