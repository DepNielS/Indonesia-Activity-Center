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
import { activities } from '../../database/schema';

import {
  ActivityStatus,
  CreateActivityDto,
} from './dto/create-activity.dto';

import { UpdateActivityDto } from './dto/update-activity.dto';

@Injectable()
export class ActivitiesService {

  // ==========================================
  // CREATE
  // ==========================================

  async createActivity(
    dto: CreateActivityDto,
  ) {
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
          status: ActivityStatus.DRAFT,
        })
        .returning();

    return result[0];
  }

  // ==========================================
  // FIND ALL
  // ==========================================

  async findAll() {
    return db
      .select()
      .from(activities)
      .orderBy(
        asc(activities.name),
      );
  }

  // ==========================================
  // FIND BY ID
  // ==========================================

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

  // ==========================================
  // FIND PUBLISHED
  // ==========================================

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
      })
      .from(activities)
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

  // ==========================================
  // FIND PUBLISHED BY SLUG
  // ==========================================

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
      })
      .from(activities)
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

  // ==========================================
  // UPDATE
  // ==========================================

  async updateActivity(
    id: number,
    dto: UpdateActivityDto,
  ) {
    const existingActivity =
      await this.findById(id);

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

  // ==========================================
  // PUBLISH
  // ==========================================

  async publishActivity(
    id: number,
  ) {
    const activity =
      await this.findById(id);

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

  // ==========================================
  // UNPUBLISH
  // ==========================================

  async unpublishActivity(
    id: number,
  ) {
    const activity =
      await this.findById(id);

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
}