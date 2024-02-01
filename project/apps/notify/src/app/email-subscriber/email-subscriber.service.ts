import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity } from './entity/email-subscriber.entity';
import { CreateSubscriberDto } from '@project/dto';
import { EmailSubscriberRepository } from './repository/email-subscriber.repository';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDto) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(
      email
    );

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository.save(
      new EmailSubscriberEntity().populate(subscriber)
    );
  }
}
