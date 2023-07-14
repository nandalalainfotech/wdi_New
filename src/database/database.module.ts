import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { getNestDbConfig } from "src/config/database.config";


@Module({
    imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => getNestDbConfig(configService),
      }),
    ],
  })
  class DatabaseModule {}
   
  export default DatabaseModule;