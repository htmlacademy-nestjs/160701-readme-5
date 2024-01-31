import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EMAIL_SUBJECT } from './mail.constant';
import { Subscriber } from '@project/libs/shared/app/types';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly notifyConfig: ConfigService
  ) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.get('mail.from'),
      to: subscriber.email,
      subject: EMAIL_SUBJECT.AddSubscriber,
      template: './add-subscriber',
      context: {
        user: `${subscriber.firstname}`,
        email: `${subscriber.email}`,
      },
    });
  }

  public async sendNotifyChangePassword(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      from: this.notifyConfig.get('mail.from'),
      to: subscriber.email,
      subject: EMAIL_SUBJECT.ChangePassword,
      template: './change-password',
      context: {
        user: `${subscriber.firstname}`,
      },
    });
  }
}
