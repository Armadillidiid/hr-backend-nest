import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./database/database.config.js";
import { appConfig } from "./app.config.js";
import { authConfig } from "./auth/auth.config.js";
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
