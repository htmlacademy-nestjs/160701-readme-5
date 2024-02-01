import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { ConfigService } from '@nestjs/config';
import { CreateSubscriberDto } from '@project/dto';
import { RabbitRouting } from '@project/libs/shared/app/types';

import { ChangeSubscriberPasswordDto } from '@project/dto';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    private readonly rabbitOptions: ConfigService
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDto) {
    return this.rabbitClient.publish<CreateSubscriberDto>(
      String(this.rabbitOptions.get('rabbit.exchange')),
      RabbitRouting.AddSubscriber,
      dto
    );
  }

  public async changePassword(dto: ChangeSubscriberPasswordDto) {
    return this.rabbitClient.publish<ChangeSubscriberPasswordDto>(
      String(this.rabbitOptions.get('rabbit.exchange')),
      RabbitRouting.ChangePassword,
      dto
    );
  }
}
