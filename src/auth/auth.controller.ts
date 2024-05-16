import { Controller, Body, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";
import { HttpCode, HttpStatus } from "@nestjs/common";
import { ZodValidationPipe } from "@/utils/pipes/ZodValidationPipe.js";
import { signUpRequestSchema, SignUpDto } from "./dto/sign-up.dto.js";
import { UsePipes } from "@nestjs/common";

@Controller({
  version: "1",
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("email/sign-up")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ZodValidationPipe(signUpRequestSchema))
  async register(@Body() createUserDto: SignUpDto): Promise<void> {
    return this.authService.signUp(createUserDto);
  }
}
