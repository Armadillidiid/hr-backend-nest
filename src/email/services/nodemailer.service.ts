import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import nodemailer from "nodemailer";
import type { GlobalConfig } from "@/app.config.type.js";
import { render } from "@react-email/components";
import { AwsSESService } from "./aws-ses.service.js";
import aws from "@aws-sdk/client-ses";

@Injectable()
export class NodeMailerService {
  private readonly transporter: nodemailer.Transporter;

  constructor(
    private readonly configService: ConfigService<GlobalConfig>,
    private readonly awsSESService: AwsSESService,
  ) {
    const email = this.configService.getOrThrow("email", { infer: true });

    if (email.EMAIL_PROVIDER === "aws_ses") {
      this.transporter = nodemailer.createTransport({
        SES: {
          ses: this.awsSESService.ses,
          aws,
        },
      });
    } else {
      this.transporter = nodemailer.createTransport({
        host: email.EMAIL_HOST,
        port: email.EMAIL_PORT,
        ignoreTLS: email.EMAIL_IGNORE_TLS,
        secure: email.EMAIL_SECURE,
        auth: {
          user: email.EMAIL_USER,
          pass: email.EMAIL_PASSWORD,
        },
      });
    }
  }

  async sendMail({
    template,
    mailOptions,
  }: {
    template: React.JSX.Element;
    mailOptions: nodemailer.SendMailOptions;
  }): Promise<void> {
    const html = render(template);

    const defaultEmail = this.configService.get("email.EMAIL_DEFAULT_EMAIL", {
      infer: true,
    });
    const defaultName = this.configService.get("email.EMAIL_DEFAULT_NAME", {
      infer: true,
    });

    await this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions.from
        ? mailOptions.from
        : `"${defaultName}" <${defaultEmail}>`,
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
