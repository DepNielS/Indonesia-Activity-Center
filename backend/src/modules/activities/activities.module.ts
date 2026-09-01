import { Module } from '@nestjs/common';

import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';

import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
  ],
  controllers: [
    ActivitiesController,
  ],
  providers: [
    ActivitiesService,
  ],
  exports: [
    ActivitiesService,
  ],
})
export class ActivitiesModule {}