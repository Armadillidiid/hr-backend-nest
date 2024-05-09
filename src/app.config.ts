import { z } from "zod";
import { registerAs } from "@nestjs/config";

const appConfigSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).optional(),
  APP_PORT: z.coerce.number().int().positive().optional(),
  APP_NAME: z.string().min(1).optional(),
  API_PREFIX: z.string().min(1).optional(),
  FRONTEND_DOMAIN: z.string().min(1).optional(),
  BACKEND_DOMAIN: z.string().min(1).optional(),
});

export type AppConfig = z.infer<typeof appConfigSchema>;
export const APP_CONFIG_TOKEN = "app"

export const appConfig = registerAs<AppConfig>("app", () => {
  const env = appConfigSchema.parse(process.env);
  return {
    NODE_ENV: env.NODE_ENV ?? "development",
    APP_PORT: env.APP_PORT ?? 3000,
    APP_NAME: env.APP_NAME ?? "app",
    API_PREFIX: env.API_PREFIX ?? "api",
    FRONTEND_DOMAIN: env.FRONTEND_DOMAIN,
    BACKEND_DOMAIN: env.BACKEND_DOMAIN ?? "http://localhost",
  } satisfies AppConfig;
});
