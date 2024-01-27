import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { RabbitRouting } from '@project/libs/shared/app/types';
import { MailService } from '../mail/mail.service';
import { ChangeSubscriberPasswordDto } from './dto/change-subscriber-password.dto';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.ChangePassword,
    queue: 'readme.notify.income',
  })
  public async changePassword(subscriber: ChangeSubscriberPasswordDto) {
    this.mailService.sendNotifyChangePassword(subscriber);
  }
}
