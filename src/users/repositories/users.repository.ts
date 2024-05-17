import { PrismaService } from "@/prisma/prisma.service.js";
import { IUserRepository } from "../interfaces/users.interface.js";
import { Prisma, User } from "@prisma/client";

// TODO: Argument types are wrong in the following methods.
// Delete file or Change them to the correct types.
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  create(user: User): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...user,
        paymentMethod: user.paymentMethod ? user.paymentMethod : undefined,
        billingAddress: user.billingAddress ? user.billingAddress : undefined,
      },
    });
  }

  findOne(fields: Prisma.UserWhereUniqueInput): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: fields,
    });
  }

  update(id: number, user: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...user,
        paymentMethod: user.paymentMethod ? user.paymentMethod : undefined,
        billingAddress: user.billingAddress ? user.billingAddress : undefined,
      },
    });
  }

  // softDelete(id: number): Promise<User> {
  //   return this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       deletedAt: new Date(),
  //     },
  //   });
  // }
}
