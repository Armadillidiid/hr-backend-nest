import { z } from "zod";
import { registerAs } from "@nestjs/config";

const authConfigSchema = z.object({
  AUTH_JWT_SECRET: z.string().min(1),
  AUTH_JWT_TOKEN_EXPIRES_IN: z.string().min(1),
  AUTH_REFRESH_SECRET: z.string().min(1),
  AUTH_REFRESH_TOKEN_EXPIRES_IN: z.string().min(1),
  AUTH_FORGOT_SECRET: z.string().min(1),
  AUTH_FORGOT_TOKEN_EXPIRES_IN: z.string().min(1),
  AUTH_CONFIRM_EMAIL_SECRET: z.string().min(1),
  AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN: z.string().min(1),
});

export type AuthConfig = z.infer<typeof authConfigSchema>;

export const authConfig = registerAs<AuthConfig>("auth", () => {
  const env = authConfigSchema.parse(process.env);
  return {
    AUTH_JWT_SECRET: env.AUTH_JWT_SECRET,
    AUTH_JWT_TOKEN_EXPIRES_IN: env.AUTH_JWT_TOKEN_EXPIRES_IN,
    AUTH_REFRESH_SECRET: env.AUTH_REFRESH_SECRET,
    AUTH_REFRESH_TOKEN_EXPIRES_IN: env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    AUTH_FORGOT_SECRET: env.AUTH_FORGOT_SECRET,
    AUTH_FORGOT_TOKEN_EXPIRES_IN: env.AUTH_FORGOT_TOKEN_EXPIRES_IN,
    AUTH_CONFIRM_EMAIL_SECRET: env.AUTH_CONFIRM_EMAIL_SECRET,
    AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN:
      env.AUTH_CONFIRM_EMAIL_TOKEN_EXPIRES_IN,
  } satisfies AuthConfig;
});
