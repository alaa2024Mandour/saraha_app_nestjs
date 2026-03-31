import { Module } from '@nestjs/common';
import { DB_Module } from './DB/db.module';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import config from 'config/config.service';
import { AuthModule } from './common/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
    }),
    DB_Module,
    UserModule,
    AuthModule
  ]
})
export class AppModule {}
