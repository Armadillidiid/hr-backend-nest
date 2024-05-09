import { DatabaseConfig } from "./database/database.config.js";
import { AppConfig } from "./app.config.js";
import { AuthConfig } from "./auth/auth.config.js";

export type GlobalConfig = {
  auth: AuthConfig;
  app: AppConfig;
  database: DatabaseConfig;
}
