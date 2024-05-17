import type { Session, User } from "@prisma/client";

export type JwtPayload = Pick<User, "publicId"> & {
  sessionId: Session["publicId"];
  iat: number;
  exp: number;
};

export type JwtRefreshPayload = {
  sessionId: Session["publicId"];
  hash: Session["hash"];
  iat: number;
  exp: number;
};
