import { Prisma, type User } from "@prisma/client";

export interface IUserRepository {
  create: (user: User) => Promise<User>;
  findOne: (fields: Prisma.UserWhereUniqueInput) => Promise<User | null>;
  update: (id: number, user: Partial<User>) => Promise<User>;
  // softDelete: (id: number) => Promise<User>;
}
