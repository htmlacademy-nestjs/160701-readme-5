import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronTime } from './cronTime.enum';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  @Cron(CronTime.EVERY_DAY)
  handleCron() {
    this.logger.debug('Called every day');
  }
}
