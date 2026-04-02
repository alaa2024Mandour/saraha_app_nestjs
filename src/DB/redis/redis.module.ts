import { Module, Global } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from './redis.service';

@Global() 
@Module({
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
  ],
  exports: ['REDIS_CLIENT', RedisService],
})
export class RedisModule {}