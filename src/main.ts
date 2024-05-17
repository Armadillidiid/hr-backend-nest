import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import {
  FastifyAdapter,
  type NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ConfigService } from "@nestjs/config";
import type { GlobalConfig } from "./app.config.type.js";
import { VersioningType } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: "info",
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      },
    }),
  );

  app.enableCors();
  app.enableShutdownHooks();

  const configService = app.get(ConfigService<GlobalConfig>);
  app.setGlobalPrefix(
    configService.getOrThrow("app.API_PREFIX", { infer: true }),
    {
      exclude: ["/"],
    },
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(
    configService.getOrThrow("app.APP_PORT", { infer: true }),
    "0.0.0.0",
  );
}
bootstrap();
