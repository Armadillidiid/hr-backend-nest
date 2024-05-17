import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { FastifyRequest } from "fastify";
import { ConfigService } from "@nestjs/config";
import type { GlobalConfig } from "@/app.config.type.js";
import type { JwtRefreshPayload } from "../auth.type.js";
import { extractTokenFromHeader } from "@/utils/extractTokenFromHeader.js";

@Injectable()
export class AuthRefreshGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<GlobalConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(
        token,
        {
          secret: this.configService.get("auth.AUTH_REFRESH_SECRET", {
            infer: true,
          }),
        },
      );

      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
        throw new UnauthorizedException("Token expired");
      }

      if (!payload.sessionId) {
        throw new UnauthorizedException();
      }
      request["userRefresh"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
