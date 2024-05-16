import type { FastifyRequest } from "fastify";
import { JwtPayload, JwtRefreshPayload } from "./auth/auth.type.ts";

declare module "fastify" {
  interface FastifyRequest extends FastifyRequest {
    user?: JwtPayload;
    userRefresh?: JwtRefreshPayload;
  }
}
