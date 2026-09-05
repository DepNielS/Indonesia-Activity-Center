import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  and,
  asc,
  eq,
} from 'drizzle-orm';

import { db } from '../../db';

import {
  activities,
  activityCategories,
} from '../../database/schema';

import {
  ActivityStatus,
  CreateActivityDto,
} from './dto/create-activity.dto';

import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {

  // ============================================
  // CREATE ACTIVITY
  // ============================================

  async createActivity(
    dto: CreateActivityDto,
  ) {
    // Check duplicate slug
    const existingActivity =
      await db
        .select()
        .from(activities)
        .where(
          eq(
            activities.slug,
            dto.slug,
          ),
        )
        .limit(1);

    if (existingActivity[0]) {
      throw new ConflictException(
        'Activity slug is already registered',
      );
    }

    // Check category exists
    const category =
      await db
        .select()
        .from(activityCategories)
        .where(
          eq(
            activityCategories.id,
            dto.categoryId,
          ),
        )
        .limit(1);

    if (!category[0]) {
      throw new NotFoundException(
        'Activity category not found',
      );
    }

    // Create activity
    const result =
      await db
        .insert(activities)
        .values({
          name: dto.name,
          slug: dto.slug,
          description: dto.description,
          image: dto.image,
          location: dto.location,
          duration: dto.duration,

          // Category relation
          categoryId: dto.categoryId,

          // New activity always starts as DRAFT
          status: ActivityStatus.DRAFT,
        })
        .returning();

    return result[0];
  }


  // ============================================
  // FIND ALL ACTIVITIES
  // ============================================

  async findAll() {
    return db
      .select()
      .from(activities)
      .orderBy(
        asc(activities.name),
      );
  }


  // ============================================
  // FIND ACTIVITY BY ID
  // ============================================

  async findById(
    id: number,
  ) {
    const result =
      await db
        .select()
        .from(activities)
        .where(
          eq(
            activities.id,
            id,
          ),
        )
        .limit(1);

    const activity =
      result[0];

    if (!activity) {
      throw new NotFoundException(
        'Activity not found',
      );
    }

    return activity;
  }

  
// ============================================
// FIND PUBLISHED ACTIVITIES BY CATEGORY
// ============================================

async findPublishedByCategory(
  categorySlug: string,
) {
  const category =
    await db
      .select({
        id: activityCategories.id,
        name: activityCategories.name,
        slug: activityCategories.slug,
      })
      .from(activityCategories)
      .where(
        eq(
          activityCategories.slug,
          categorySlug,
        ),
      )
      .limit(1);

  if (!category[0]) {
    throw new NotFoundException(
      'Activity category not found',
    );
  }

  return db
    .select({
      id: activities.id,
      name: activities.name,
      slug: activities.slug,
      description: activities.description,
      image: activities.image,
      location: activities.location,
      duration: activities.duration,

      category: {
        id: activityCategories.id,
        name: activityCategories.name,
        slug: activityCategories.slug,
      },
    })
    .from(activities)
    .innerJoin(
      activityCategories,
      eq(
        activities.categoryId,
        activityCategories.id,
      ),
    )
    .where(
      and(
        eq(
          activities.status,
          ActivityStatus.PUBLISHED,
        ),
        eq(
          activityCategories.slug,
          categorySlug,
        ),
      ),
    )
    .orderBy(
      asc(activities.name),
    );
}




  // ============================================
  // FIND PUBLISHED ACTIVITIES
  // ============================================

  async findPublished() {
  return db
    .select({
      id: activities.id,
      name: activities.name,
      slug: activities.slug,
      description: activities.description,
      image: activities.image,
      location: activities.location,
      duration: activities.duration,

      category: {
        id: activityCategories.id,
        name: activityCategories.name,
        slug: activityCategories.slug,
      },
    })
    .from(activities)
    .innerJoin(
      activityCategories,
      eq(
        activities.categoryId,
        activityCategories.id,
      ),
    )
    .where(
      eq(
        activities.status,
        ActivityStatus.PUBLISHED,
      ),
    )
    .orderBy(
      asc(activities.name),
    );
}


  // ============================================
  // FIND PUBLISHED ACTIVITY BY SLUG
  // ============================================

  async findPublishedBySlug(
  slug: string,
) {
  const result =
    await db
      .select({
        id: activities.id,
        name: activities.name,
        slug: activities.slug,
        description: activities.description,
        image: activities.image,
        location: activities.location,
        duration: activities.duration,

        category: {
          id: activityCategories.id,
          name: activityCategories.name,
          slug: activityCategories.slug,
        },
      })
      .from(activities)
      .innerJoin(
        activityCategories,
        eq(
          activities.categoryId,
          activityCategories.id,
        ),
      )
      .where(
        and(
          eq(
            activities.slug,
            slug,
          ),
          eq(
            activities.status,
            ActivityStatus.PUBLISHED,
          ),
        ),
      )
      .limit(1);

  const activity =
    result[0];

  if (!activity) {
    throw new NotFoundException(
      'Published activity not found',
    );
  }

  return activity;
}


  // ============================================
  // UPDATE ACTIVITY
  // ============================================

  async updateActivity(
    id: number,
    dto: UpdateActivityDto,
  ) {
    // Make sure activity exists
    await this.findById(id);

    // Check duplicate slug
    if (
      dto.slug !== undefined
    ) {
      const slugOwner =
        await db
          .select()
          .from(activities)
          .where(
            eq(
              activities.slug,
              dto.slug,
            ),
          )
          .limit(1);

      if (
        slugOwner[0] &&
        slugOwner[0].id !== id
      ) {
        throw new ConflictException(
          'Activity slug is already registered',
        );
      }
    }


    // Check category if categoryId is being updated
    if (
      dto.categoryId !== undefined
    ) {
      const category =
        await db
          .select()
          .from(activityCategories)
          .where(
            eq(
              activityCategories.id,
              dto.categoryId,
            ),
          )
          .limit(1);

      if (!category[0]) {
        throw new NotFoundException(
          'Activity category not found',
        );
      }
    }


    // Update activity
    const result =
      await db
        .update(activities)
        .set({

          ...(dto.name !==
            undefined && {
            name: dto.name,
          }),

          ...(dto.slug !==
            undefined && {
            slug: dto.slug,
          }),

          ...(dto.description !==
            undefined && {
            description:
              dto.description,
          }),

          ...(dto.image !==
            undefined && {
            image: dto.image,
          }),

          ...(dto.location !==
            undefined && {
            location:
              dto.location,
          }),

          ...(dto.duration !==
            undefined && {
            duration:
              dto.duration,
          }),

          ...(dto.categoryId !==
            undefined && {
            categoryId:
              dto.categoryId,
          }),

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            activities.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }


  // ============================================
  // PUBLISH ACTIVITY
  // ============================================

  async publishActivity(
    id: number,
  ) {
    const activity =
      await this.findById(id);

    // Prevent publishing already published activity
    if (
      activity.status ===
      ActivityStatus.PUBLISHED
    ) {
      throw new ConflictException(
        'Activity is already published',
      );
    }

    const result =
      await db
        .update(activities)
        .set({
          status:
            ActivityStatus.PUBLISHED,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            activities.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }


  // ============================================
  // UNPUBLISH ACTIVITY
  // ============================================

  async unpublishActivity(
    id: number,
  ) {
    const activity =
      await this.findById(id);

    // Only published activity can be unpublished
    if (
      activity.status !==
      ActivityStatus.PUBLISHED
    ) {
      throw new ConflictException(
        'Only published activities can be unpublished',
      );
    }

    const result =
      await db
        .update(activities)
        .set({
          status:
            ActivityStatus.DRAFT,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            activities.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }

  async deleteActivity(id: number) {
  const existing = await db
    .select({
      id: activities.id,
    })
    .from(activities)
    .where(eq(activities.id, id))
    .limit(1);

  if (!existing[0]) {
    throw new NotFoundException(
      'Activity not found',
    );
  }

  await db
    .delete(activities)
    .where(eq(activities.id, id));

  return {
    message: 'Activity deleted successfully',
  };
}
}