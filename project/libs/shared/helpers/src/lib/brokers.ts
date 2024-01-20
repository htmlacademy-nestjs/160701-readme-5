import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './common';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: [
        {
          name: String(config.get<string>(`${optionSpace}.queue`)),
          type: 'direct',
        },
      ],
      uri: getRabbitMQConnectionString({
        host: String(config.get<string>(`${optionSpace}.host`)),
        password: String(config.get<string>(`${optionSpace}.password`)),
        user: String(config.get<string>(`${optionSpace}.user`)),
        port: String(config.get<string>(`${optionSpace}.port`)),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService],
  };
}
