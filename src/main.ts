import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

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
  app.enableCors()
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
