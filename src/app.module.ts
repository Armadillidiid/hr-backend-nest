import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { UsersModule } from "./users/users.module.js";
import { ConfigModule } from "@nestjs/config";
import { databaseConfig } from "./database/database.config.js";
import { appConfig } from "./app.config.js";
import { authConfig } from "./auth/auth.config.js";
import { emailConfig } from "./email/config/email.config.js";
import { EmailModule } from "./email/email.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { RouterModule } from "@nestjs/core";
import { PrismaService } from "./prisma/prisma.service.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig, emailConfig],
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
    EmailModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
