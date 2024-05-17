import { z } from "zod";
import { signUpRequestSchema } from "@/auth/dto/sign-up.dto.js";

export const createUserSchema = signUpRequestSchema.extend({});

export type CreateUserDto = z.infer<typeof createUserSchema>;
