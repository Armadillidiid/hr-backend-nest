import { z } from "zod";
import { registerAs } from "@nestjs/config";

const awsSesSchema = z.object({
  PROVIDER: z.literal("aws_ses"),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  AWS_REGION: z.string().min(1),
});

const localMailerSchema = z.object({
  PROVIDER: z.literal("local_mailer"),
  EMAIL_PORT: z.coerce.number().positive().int().default(587),
  EMAIL_HOST: z.string().min(1),
  EMAIL_USER: z.string().min(1),
  EMAIL_PASSWORD: z.string().min(1),
  EMAIL_IGNORE_TLS: z.boolean().default(true),
  EMAIL_SECURE: z.boolean().default(true),
  EMAIL_REQUIRE_TLS: z.boolean().default(true),
});

const emailConfigSchema = z
  .object({
    EMAIL_DEFAULT_EMAIL: z.string().default("hello@example.com"),
    EMAIL_DEFAULT_NAME: z.string().default("Example"),
  })
  .and(awsSesSchema.or(localMailerSchema));

export type EmailConfig = z.infer<typeof emailConfigSchema>;

export const emailConfig = registerAs<EmailConfig>("email", () => {
  const env = emailConfigSchema.parse(process.env);
  return {
    EMAIL_DEFAULT_EMAIL: env.EMAIL_DEFAULT_EMAIL,
    EMAIL_DEFAULT_NAME: env.EMAIL_DEFAULT_NAME,
    ...(env.PROVIDER === "aws_ses"
      ? {
          PROVIDER: env.PROVIDER,
          AWS_ACCESS_KEY_ID: env.AWS_ACCESS_KEY_ID,
          AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY,
          AWS_REGION: env.AWS_REGION,
        }
      : {
          PROVIDER: env.PROVIDER,
          EMAIL_PORT: env.EMAIL_PORT,
          EMAIL_HOST: env.EMAIL_HOST,
          EMAIL_USER: env.EMAIL_USER,
          EMAIL_PASSWORD: env.EMAIL_PASSWORD,
          EMAIL_IGNORE_TLS: env.EMAIL_IGNORE_TLS,
          EMAIL_SECURE: env.EMAIL_SECURE,
          EMAIL_REQUIRE_TLS: env.EMAIL_REQUIRE_TLS,
        }),
  };
});
