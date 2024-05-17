import { Injectable } from "@nestjs/common";
import type { SignUpDto } from "./dto/sign-up.dto.js";
import { UsersService } from "@/users/users.service.js";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import type { GlobalConfig } from "@/app.config.type.js";
import { PrismaService } from "@/prisma/prisma.service.js";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<GlobalConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async signUp(dto: SignUpDto) {
    const user = await this.usersService.create(dto);
    const signUpInitializer = await this.createSignUpInitializer(user.id);

    const hash = await this.jwtService.signAsync(
      {
        confirmEmailUserId: user.id,
      },
      {
        secret: this.configService.get("auth.AUTH_CONFIRM_EMAIL_SECRET", {
          infer: true,
        }),
        expiresIn: this.configService.get(
          "auth.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN",
          { infer: true },
        ),
      },
    );

    // mail confirmation to user
    // await this.mailService.userSignUp({
    //   to: dto.email,
    //   data: {
    //     hash,
    //   },
    // });
  }

  async createSignUpInitializer(userId: number) {
    return await this.prisma.signUpInitializer.create({
      data: {
        planSelected: false,
        emailVerified: false,
        businessCreated: false,
        signUpCompleted: false,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}
