import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { eq, and } from 'drizzle-orm';

import { db } from '../../db';
import { events } from '../../database/schema';

import {
  CreateEventDto,
  EventStatus,
} from './dto/create-event.dto';

import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  async createEvent(dto: CreateEventDto) {
  const startAt = new Date(dto.startAt);
  const endAt = new Date(dto.endAt);

  if (endAt <= startAt) {
    throw new ConflictException(
      'Event end time must be after start time',
    );
    }

    const existingEvent = await db
      .select()
      .from(events)
      .where(eq(events.slug, dto.slug))
      .limit(1);

    if (existingEvent[0]) {
      throw new ConflictException(
        'Event slug is already registered',
      );
    }

    const result = await db
      .insert(events)
      .values({
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        image: dto.image,
        startAt: new Date(dto.startAt),
        endAt: new Date(dto.endAt),
        location: dto.location,
        status: dto.status ?? EventStatus.DRAFT,
      })
      .returning();

    return result[0];
  }

  async findAll() {
    return db
      .select()
      .from(events);
  }

  async findById(id: number) {
    const result = await db
      .select()
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    const event = result[0];

    if (!event) {
      throw new NotFoundException(
        'Event not found',
      );
    }

    return event;
  }

  async updateEvent(
    id: number,
    dto: UpdateEventDto,
  ) {
    const existingEvent =
      await this.findById(id);

    const startAt =
      dto.startAt !== undefined
        ? new Date(dto.startAt)
        : existingEvent.startAt;

    const endAt =
      dto.endAt !== undefined
        ? new Date(dto.endAt)
        : existingEvent.endAt;

    if (endAt <= startAt) {
      throw new ConflictException(
        'Event end time must be after start time',
      );
    }

    if (dto.slug !== undefined) {
      const slugOwner = await db
        .select()
        .from(events)
        .where(eq(events.slug, dto.slug))
        .limit(1);

      if (
        slugOwner[0] &&
        slugOwner[0].id !== id
      ) {
        throw new ConflictException(
          'Event slug is already registered',
        );
      }
    }

    const result = await db
      .update(events)
      .set({
        ...(dto.title !== undefined && {
          title: dto.title,
        }),

        ...(dto.slug !== undefined && {
          slug: dto.slug,
        }),

        ...(dto.description !== undefined && {
          description: dto.description,
        }),

        ...(dto.image !== undefined && {
          image: dto.image,
        }),

        ...(dto.startAt !== undefined && {
          startAt,
        }),

        ...(dto.endAt !== undefined && {
          endAt,
        }),

        ...(dto.location !== undefined && {
          location: dto.location,
        }),

        ...(dto.status !== undefined && {
          status: dto.status,
        }),

        updatedAt: new Date(),
      })
      .where(eq(events.id, id))
      .returning();

    return result[0];
  }

  async publishEvent(id: number) {
    const event =
      await this.findById(id);

    if (event.status === EventStatus.PUBLISHED) {
      throw new ConflictException(
        'Event is already published',
      );
    }

    if (event.status === EventStatus.CANCELLED) {
      throw new ConflictException(
        'Cancelled event cannot be published',
      );
    }

    const result = await db
      .update(events)
      .set({
        status: EventStatus.PUBLISHED,
        updatedAt: new Date(),
      })
      .where(eq(events.id, id))
      .returning();

    return result[0];
  }

  async findPublished() {
  return db
    .select({
      id: events.id,
      title: events.title,
      slug: events.slug,
      description: events.description,
      image: events.image,
      startAt: events.startAt,
      endAt: events.endAt,
      location: events.location,
    })
    .from(events)
    .where(
      eq(
        events.status,
        EventStatus.PUBLISHED,
      ),
    );
}

async findPublishedBySlug(
  slug: string,
) {
  const result = await db
    .select({
      id: events.id,
      title: events.title,
      slug: events.slug,
      description: events.description,
      image: events.image,
      startAt: events.startAt,
      endAt: events.endAt,
      location: events.location,
    })
    .from(events)
    .where(
      and(
        eq(events.slug, slug),
        eq(
          events.status,
          EventStatus.PUBLISHED,
        ),
      ),
    )
    .limit(1);

  const event = result[0];

  if (!event) {
    throw new NotFoundException(
      'Published event not found',
    );
  }

  return event;
}

  async cancelEvent(id: number) {
    const event =
      await this.findById(id);

    if (event.status === EventStatus.CANCELLED) {
      throw new ConflictException(
        'Event is already cancelled',
      );
    }

    const result = await db
      .update(events)
      .set({
        status: EventStatus.CANCELLED,
        updatedAt: new Date(),
      })
      .where(eq(events.id, id))
      .returning();

    return result[0];
  }
}