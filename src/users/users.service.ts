import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto.js";
import { UpdateUserDto } from "./dto/update-user.dto.js";
import bcrypt from "bcrypt";
import { UserRepository } from "./repositories/users.repository.js";
import { PrismaService } from "@/prisma/prisma.service.js";
import { generateUniqueId } from "@/utils/generateUniqueId.js";

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}
  async create(dto: CreateUserDto) {
    const user = { ...dto };
    const salt = bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(dto.password, salt);
    user.password = hash;

    const existingUser = await this.userRepository.findOne({
      email: dto.email,
    });

    if (existingUser) {
      throw new UnprocessableEntityException({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: "Email already exists",
      });
    }

    return this.prisma.user.create({
      data: {
        ...user,
        publicId: generateUniqueId(),
      },
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
