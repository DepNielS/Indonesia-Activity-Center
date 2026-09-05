import {
  Controller,
  Get,
  Param,
  Delete,
} from '@nestjs/common';

import { ActivityCategoriesService } from './activity-categories.service';

@Controller('activity-categories')
export class ActivityCategoriesController {
  constructor(
    private readonly activityCategoriesService: ActivityCategoriesService,
  ) {}

  /**
   * Get all activity categories.
   *
   * GET /api/v1/activity-categories
   */
  @Get()
  findAll() {
    return this.activityCategoriesService.findAll();
  }

  /**
   * Get activity category by slug.
   *
   * GET /api/v1/activity-categories/:slug
   */
  @Get(':slug')
  findBySlug(
    @Param('slug') slug: string,
  ) {
    return this.activityCategoriesService.findBySlug(
      slug,
    );
  }
 
}