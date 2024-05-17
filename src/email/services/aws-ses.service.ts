import type { GlobalConfig } from "@/app.config.type.js";
import { SES } from "@aws-sdk/client-ses";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsSESService {
  readonly ses: SES;

  constructor(private readonly configService: ConfigService<GlobalConfig>) {
    const email = this.configService.getOrThrow("email", { infer: true });

    this.ses = new SES({
      credentials:
        email.PROVIDER === "aws_ses"
          ? {
              accessKeyId: email.AWS_ACCESS_KEY_ID,
              secretAccessKey: email.AWS_SECRET_ACCESS_KEY,
            }
          : { accessKeyId: "", secretAccessKey: "" },
      region: email.PROVIDER === "aws_ses" ? email.AWS_REGION : "",
    });
  }
}
