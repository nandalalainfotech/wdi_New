import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { RouterModule } from '@nestjs/core';
import { getNestDbConfig } from './config/database.config';
import DatabaseModule from 'src/database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    DatabaseModule,
    AdminModule,
    RouterModule.register([
      {
        path: process.env.ADMIN_URL_PREFIX,
        module: AdminModule
      }
    ])
  ],
})
export class AppModule {}
