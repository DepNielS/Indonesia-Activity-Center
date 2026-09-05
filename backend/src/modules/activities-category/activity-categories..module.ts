import { Module } from '@nestjs/common';

import { ActivityCategoriesController } from './activity-categories.controller';
import { ActivityCategoriesService } from './activity-categories.service';

@Module({
  controllers: [
    ActivityCategoriesController,
  ],
  providers: [
    ActivityCategoriesService,
  ],
  exports: [
    ActivityCategoriesService,
  ],
})
export class ActivityCategoriesModule {}