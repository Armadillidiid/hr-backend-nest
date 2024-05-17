import type { DatabaseConfig } from "./database/database.config.js";
import type { AppConfig } from "./app.config.js";
import type { AuthConfig } from "./auth/auth.config.js";
import type { EmailConfig } from "./email/config/email.config.js";

export type GlobalConfig = {
  auth: AuthConfig;
  app: AppConfig;
  database: DatabaseConfig;
  email: EmailConfig
}
