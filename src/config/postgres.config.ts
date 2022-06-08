import { ConfigService } from '@nestjs/config';

const options = { type: 'postgres', autoLoadEntities: true, synchronize: true };

export const getPosgresConfig = async (
  configService: ConfigService,
): Promise<any> => ({
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USERNAME'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  ...options,
});
