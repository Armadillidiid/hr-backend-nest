import type { FastifyRequest } from "fastify";
import { JwtPayload, JwtRefreshPayload } from "./auth/auth.types.ts";

declare module "fastify" {
  interface FastifyRequest extends FastifyRequest {
    user?: JwtPayload;
    userRefresh?: JwtRefreshPayload;
  }
}
