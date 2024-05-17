import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { EmailService } from "./services/email.service.js";
import { AwsSESService } from "./services/aws-ses.service.js";
import { NodeMailerService } from "./services/nodemailer.service.js";

@Module({
  imports: [ConfigModule],
  providers: [NodeMailerService, EmailService, AwsSESService],
})
export class EmailModule {}
