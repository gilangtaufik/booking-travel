import { DBConfigModule } from '@config/database/config.module';
import { AppConfigModule } from '@config/app/config.module';

export const CONFIG_MODULES = [
  DBConfigModule,
  AppConfigModule
];
