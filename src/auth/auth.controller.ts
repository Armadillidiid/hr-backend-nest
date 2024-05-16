import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { AuthGuard } from "./guards/access.guard.js";
import { UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service.js";

import { CreateAuthDto } from "./dto/create-auth.dto.js";
import { UpdateAuthDto } from "./dto/update-auth.dto.js";
import type { FastifyRequest } from "fastify";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AuthRegisterLoginDto } from "./dto/register.dto.js";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  // @Post("email/login")
  // @HttpCode(HttpStatus.OK)
  // public login(@Body() loginDto: AuthEmailLoginDto): Promise<LoginResponseDto> {
  //   return this.service.validateLogin(loginDto);
  // }

  @Post("email/register")
  @HttpCode(HttpStatus.NO_CONTENT)
  async register(@Body() createUserDto: AuthRegisterLoginDto): Promise<void> {
    return this.service.register(createUserDto);
  }

  // @Post("email/confirm")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async confirmEmail(
  //   @Body() confirmEmailDto: AuthConfirmEmailDto,
  // ): Promise<void> {
  //   return this.service.confirmEmail(confirmEmailDto.hash);
  // }
  //
  // @Post("forgot/password")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async forgotPassword(
  //   @Body() forgotPasswordDto: AuthForgotPasswordDto,
  // ): Promise<void> {
  //   return this.service.forgotPassword(forgotPasswordDto.email);
  // }
  //
  // @Post("reset/password")
  // @HttpCode(HttpStatus.NO_CONTENT)
  // resetPassword(@Body() resetPasswordDto: AuthResetPasswordDto): Promise<void> {
  //   return this.service.resetPassword(
  //     resetPasswordDto.hash,
  //     resetPasswordDto.password,
  //   );
  // }
  //
  // @ApiBearerAuth()
  // @ApiOkResponse({
  //   type: RefreshResponseDto,
  // })
  // @SerializeOptions({
  //   groups: ["me"],
  // })
  // @Post("refresh")
  // @UseGuards(AuthGuard("jwt-refresh"))
  // @HttpCode(HttpStatus.OK)
  // public refresh(@Request() request): Promise<RefreshResponseDto> {
  //   return this.service.refreshToken({
  //     sessionId: request.user.sessionId,
  //     hash: request.user.hash,
  //   });
  // }
  //
  // @ApiBearerAuth()
  // @Post("logout")
  // @UseGuards(AuthGuard("jwt"))
  // @HttpCode(HttpStatus.NO_CONTENT)
  // public async logout(@Request() request): Promise<void> {
  //   await this.service.logout({
  //     sessionId: request.user.sessionId,
  //   });
  // }
  //
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  // @HttpCode(HttpStatus.OK)
  // @ApiOkResponse({
  //   type: User,
  // })
  // public update(
  //   @Request() request,
  //   @Body() userDto: AuthUpdateDto,
  // ): Promise<NullableType<User>> {
  //   return this.service.update(request.user, userDto);
  // }
  //
  // @ApiBearerAuth()
  // @Delete("me")
  // @UseGuards(AuthGuard("jwt"))
  // @HttpCode(HttpStatus.NO_CONTENT)
  // public async delete(@Request() request): Promise<void> {
  //   return this.service.softDelete(request.user);
  // }
}
