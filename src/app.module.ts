import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./database/database.config.js";
import { appConfig } from "./app.config.js";
import { authConfig } from "./auth/auth.config.js";
import { AuthModule } from "./auth/auth.module.js";
import { RouterModule } from "@nestjs/core";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
    }),
    RouterModule.register([
      {
        path: "auth",
        module: AuthModule,
      },
      {
        path: "users",
        module: UsersModule,
      },
    ]),
  ],
  controllers: [AppController],
})
export class AppModule {}
