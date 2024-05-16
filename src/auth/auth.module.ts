import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { JwtModule } from "@nestjs/jwt";
import { AuthGuard } from "./guards/access.guard.js";
import { AuthRefreshGuard } from "./guards/refresh.guard.js";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthRefreshGuard],
})
export class AuthModule {}
