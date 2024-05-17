import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NodeMailerService } from "./nodemailer.service.js";
import type { GlobalConfig } from "@/app.config.type.js";
import ConfirmEmail from "../templates/confirm-email.js";

type SignUpProps = {
  email: string;
  name: string;
  hash: string;
};

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: NodeMailerService,
    private readonly configService: ConfigService<GlobalConfig>,
  ) {}

  async signUp(props: SignUpProps) {
    const url = new URL(
      this.configService.getOrThrow("app.FRONTEND_DOMAIN", { infer: true }),
      "/auth/confirm-email",
    );
    const subject = "Confirm your email";

    url.searchParams.append("hash", props.hash);

    const template = ConfirmEmail({
      name: props.name,
      url: url.toString(),
    });

    await this.mailerService.sendMail({
      template,
      mailOptions: {
        to: props.email,
        subject,
        text: `${url.toString()} ${subject}`,
      },
    });
  }
}
