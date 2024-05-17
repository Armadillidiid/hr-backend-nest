import type { GlobalConfig } from "@/app.config.type.js";
import { SES } from "@aws-sdk/client-ses";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AwsSESService {
  readonly ses: SES | null;

  constructor(private readonly configService: ConfigService<GlobalConfig>) {
    const email = this.configService.getOrThrow("email", { infer: true });

    if (email.EMAIL_PROVIDER !== "aws_ses") {
      this.ses = null;
      return;
    }

    this.ses = new SES({
      credentials: {
        accessKeyId: email.AWS_ACCESS_KEY_ID,
        secretAccessKey: email.AWS_SECRET_ACCESS_KEY,
      },
      region: email.EMAIL_PROVIDER,
    });
  }
}
