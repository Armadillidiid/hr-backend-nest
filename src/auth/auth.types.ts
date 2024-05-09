// TODO: Add entity for User and Session
type Session = { id: number; hash: string };
type User = { id: number; role: string };

export type JwtPayload = Pick<User, "id" | "role"> & {
  sessionId: Session["id"];
  iat: number;
  exp: number;
};

export type JwtRefreshPayload = {
  sessionId: Session["id"];
  hash: Session["hash"];
  iat: number;
  exp: number;
};
