import { z } from "zod";
import { registerAs } from "@nestjs/config";

const databaseConfigSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.string().min(1),
  DATABASE_USERNAME: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;

export const databaseConfig = registerAs<DatabaseConfig>("database", () => {
  const env = databaseConfigSchema.parse(process.env);
  return {
    DIRECT_URL: env.DIRECT_URL,
    DATABASE_HOST: env.DATABASE_HOST,
    DATABASE_PORT: env.DATABASE_PORT,
    DATABASE_USERNAME: env.DATABASE_USERNAME,
    DATABASE_PASSWORD: env.DATABASE_PASSWORD,
    DATABASE_NAME: env.DATABASE_NAME,
    DATABASE_URL: env.DATABASE_URL,
  } satisfies DatabaseConfig;
});
