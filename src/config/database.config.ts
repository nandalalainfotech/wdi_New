import { ConfigService } from "@nestjs/config";


export const getDbConfig = (configService: ConfigService) => ({
  type: configService.get('DATABASE_TYPE'),
  host: configService.get('DATABASE_HOST'),
  port: configService.get('DATABASE_PORT'),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  charset: configService.get('DATABASE_CHARSET'),
  entities: [],
})


export const getNestDbConfig = (configService: ConfigService) => {
  return {
    ...getDbConfig(configService),
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
  }
}


export const getMigrationDbConfig = (configService: ConfigService) => {
  return {
    ...getDbConfig(configService),
    migrations: ['./src/database/migrations/*.ts'],
    "migrationsTableName": "migrations" 
  }
}
