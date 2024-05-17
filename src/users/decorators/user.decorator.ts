import { createParamDecorator, type ExecutionContext } from "@nestjs/common";
import { type FastifyRequest } from "fastify";

export const User = createParamDecorator(
  (data: "jwt" | "jwt-refresh" | undefined, ctx: ExecutionContext) => {
    let accessor: string;
    if (typeof data === "undefined") {
      accessor = "jwt";
    } else {
      accessor = data;
    }
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    if (
      (!request.user && accessor === "jwt") ||
      (!request.userRefresh && accessor === "jwt-refresh")
    ) {
      throw new Error("User not found in request");
    }

    if (accessor === "jwt-refresh") {
      return request.userRefresh;
    }

    return request.user;
  },
);
