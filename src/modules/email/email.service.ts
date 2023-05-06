import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(
    private configService: ConfigService,
    private mailerService: MailerService,
  ) {}

  async send(args: {
    receiver: string[];
    subject: string;
    context?: object;
    template?: string;
  }) {
    const { receiver, subject, context, template } = args;

    await this.mailerService.sendMail({
      from: this.configService.get('MAILER_EMAIL'),
      // to: receiver,
      bcc: receiver,
      subject: subject,
      context,
      template,
    });
  }
}
