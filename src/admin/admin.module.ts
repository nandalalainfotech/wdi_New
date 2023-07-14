import { APP_GUARD } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from "src/admin/controllers/auth.controller";
import { UserEntity } from "src/entities/user.entity";
import { AuthService } from "src/admin/services/auth.service";
import { UsersService } from "src/services/users.service";
import { UserController } from "./controllers/user.controller";
import { ConfigModule, ConfigService } from "@nestjs/config";
import TranslationModule from "src/translations/translation.module";
import { LanguageController } from "src/admin/controllers/language.controller";
import { LanguageEntity } from "src/entities/language.entity";
import { LanguagesService } from "src/services/languages.service";
import { PageController } from "src/admin/controllers/page.controller";
import { PageEntity } from "src/entities/page.entity";
import { PagesService } from "src/services/pages.service";
import { PageTranslationEntity } from "src/entities/pageTranslation.entity";

const controllers = [
  AuthController,
  UserController,
  LanguageController,
  PageController
]

const entities = [
  UserEntity, 
  LanguageEntity,
  PageEntity,
  PageTranslationEntity
]

const services = [
  AuthService, 
  UsersService, 
  LanguagesService,
  PagesService
]

@Module({
  imports: [
    TranslationModule.forRoot('admin'),
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ADMIN_JWT_SECRET_KEY'),
        signOptions: { expiresIn: parseInt(configService.get('ADMIN_JWT_EXPIRY_TIME'), 10) },
      }),
    })
  ],
  controllers,
  providers: [
    ...services,
    /* {
      provide: APP_GUARD,
      useClass: ApiGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    } */
  ],
})
export class AdminModule { }
