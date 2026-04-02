import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) { }

    
    async set(key: string, value: any, expireInSeconds?: number): Promise<void> {
        const stringValue = JSON.stringify(value);
        if (expireInSeconds) {
            await this.redisClient.set(key, stringValue, 'EX', expireInSeconds);
        } else {
            await this.redisClient.set(key, stringValue);
        }
    }

    
    async get<T>(key: string): Promise<T | null> {
        const data = await this.redisClient.get(key);
        if (!data) return null;
        return JSON.parse(data) as T;
    }

    
    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }

   
    async reset(): Promise<void> {
        await this.redisClient.flushall();
    }
}