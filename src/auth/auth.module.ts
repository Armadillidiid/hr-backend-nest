import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthGuard } from "./guards/auth.guard.access.js";
import { AuthRefreshGuard } from "./guards/auth.guard.refresh.js";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, AuthRefreshGuard],
})
export class AuthModule {}
