import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private mailer: MailerService) {}

  async sendAlert(to: string, name: string, code: string) {
    await this.mailer.sendMail({
      to,                   // e.g. 'your.email@gmail.com'
      subject: '[Important] Activate your Mercor Account',
      template: 'offer',    // corresponds to offer.hbs
      context: {
        name: name,
        buttonURL: `${process.env.WEBAPP_URL}/?token=${code}`,
        supportEmail: 'support@example.com',
      },
    });
  }
}