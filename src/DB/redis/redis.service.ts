import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(@Inject('REDIS_CLIENT') private readonly redisClient: Redis) { }

    
    async set({key, value, expireInSeconds}:{key: string, value: any, expireInSeconds?: number}): Promise<void> {
        const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
        if (expireInSeconds) {
            await this.redisClient.set(key, stringValue, 'EX', expireInSeconds);
        } else {
            await this.redisClient.set(key, stringValue);
        }
    }

    
    async get<T>(key: string): Promise<T |string| null> {
        const data = await this.redisClient.get(key);
        if (!data) return null;
        try {
        // حاول تعمل parse لو هو JSON فعلاً
        return JSON.parse(data);
    } catch (e) {
        // لو فشل الـ parse يبقى هو string عادي (زي الـ OTP) رجعه زي ما هو
        return data;
    }
    }

    
    async del(key: string): Promise<void> {
        await this.redisClient.del(key);
    }


    async reset(): Promise<void> {
        await this.redisClient.flushall();
    }
}