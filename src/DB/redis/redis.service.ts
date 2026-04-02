import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Redis } from '@upstash/redis';

@Injectable()
export class RedisService {
    private readonly redis: Redis;

constructor(private configService: ConfigService) {
        const url = this.configService.get<string>('UPSTASH_REDIS_REST_URL');
        const token = this.configService.get<string>('UPSTASH_REDIS_REST_TOKEN');

        
        if (!url || !token) {
            console.error('❌ Redis Config is missing! Check your .env file.');
        }

        this.redis = new Redis({
            url: url,
            token: token,
        });
    }

    async set(key: string, value: any, ttl?: number) {
        if(ttl){
            return await this.redis.set(key, value, { ex:ttl});
        }
        else{
            return await this.redis.set(key, value);
        }
    }


    async get(key: string) {
        return await this.redis.get(key);
    }
}