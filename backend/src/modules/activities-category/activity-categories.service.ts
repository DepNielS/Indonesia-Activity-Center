import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { eq, asc } from 'drizzle-orm';

import { db } from '../../db';
import { activityCategories } from '../../database/schema';

@Injectable()
export class ActivityCategoriesService {
  /**
   * Get all activity categories.
   */
  async findAll() {
    return db
      .select({
        id: activityCategories.id,
        name: activityCategories.name,
        slug: activityCategories.slug,
      })
      .from(activityCategories)
      .orderBy(asc(activityCategories.name));
  }

  /**
   * Get activity category by slug.
   */
  async findBySlug(slug: string) {
    const result = await db
      .select({
        id: activityCategories.id,
        name: activityCategories.name,
        slug: activityCategories.slug,
      })
      .from(activityCategories)
      .where(eq(activityCategories.slug, slug))
      .limit(1);

    if (!result[0]) {
      throw new NotFoundException(
        'Activity category not found',
      );
    }

    return result[0];
  }
}