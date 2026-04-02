import { Module } from '@nestjs/common';
import { DB_Module } from './DB/db.module';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './common/auth/auth.module';
import { RedisModule } from './DB/redis/redis.module';
import { EmailModule } from './common/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
    }),
    DB_Module,
    UserModule,
    AuthModule,
    RedisModule,
    EmailModule
  ]
})
export class AppModule {}
