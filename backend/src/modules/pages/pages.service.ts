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
import { pages } from '../../database/schema';

import {
  CreatePageDto,
  PageStatus,
} from './dto/create-page.dto';

import { UpdatePageDto } from './dto/update-page.dto';

@Injectable()
export class PagesService {

  async createPage(
    dto: CreatePageDto,
  ) {
    const existingPage =
      await db
        .select()
        .from(pages)
        .where(
          eq(
            pages.slug,
            dto.slug,
          ),
        )
        .limit(1);

    if (existingPage[0]) {
      throw new ConflictException(
        'Page slug is already registered',
      );
    }

    const result =
      await db
        .insert(pages)
        .values({
          title: dto.title,
          slug: dto.slug,
          excerpt: dto.excerpt,
          content: dto.content,
          image: dto.image,
          status: PageStatus.DRAFT,
        })
        .returning();

    return result[0];
  }

  async findAll() {
    return db
      .select()
      .from(pages)
      .orderBy(
        asc(pages.createdAt),
      );
  }

  async findById(
    id: number,
  ) {
    const result =
      await db
        .select()
        .from(pages)
        .where(
          eq(
            pages.id,
            id,
          ),
        )
        .limit(1);

    const page =
      result[0];

    if (!page) {
      throw new NotFoundException(
        'Page not found',
      );
    }

    return page;
  }

  async findPublished() {
    return db
      .select({
        id: pages.id,
        title: pages.title,
        slug: pages.slug,
        excerpt: pages.excerpt,
        content: pages.content,
        image: pages.image,
      })
      .from(pages)
      .where(
        eq(
          pages.status,
          PageStatus.PUBLISHED,
        ),
      )
      .orderBy(
        asc(pages.createdAt),
      );
  }

  async findPublishedBySlug(
    slug: string,
  ) {
    const result =
      await db
        .select({
          id: pages.id,
          title: pages.title,
          slug: pages.slug,
          excerpt: pages.excerpt,
          content: pages.content,
          image: pages.image,
        })
        .from(pages)
        .where(
          and(
            eq(
              pages.slug,
              slug,
            ),
            eq(
              pages.status,
              PageStatus.PUBLISHED,
            ),
          ),
        )
        .limit(1);

    const page =
      result[0];

    if (!page) {
      throw new NotFoundException(
        'Published page not found',
      );
    }

    return page;
  }

  async updatePage(
    id: number,
    dto: UpdatePageDto,
  ) {
    const existingPage =
      await this.findById(id);

    if (
      dto.slug !== undefined
    ) {
      const slugOwner =
        await db
          .select()
          .from(pages)
          .where(
            eq(
              pages.slug,
              dto.slug,
            ),
          )
          .limit(1);

      if (
        slugOwner[0] &&
        slugOwner[0].id !== id
      ) {
        throw new ConflictException(
          'Page slug is already registered',
        );
      }
    }

    const result =
      await db
        .update(pages)
        .set({
          ...(dto.title !==
            undefined && {
            title: dto.title,
          }),

          ...(dto.slug !==
            undefined && {
            slug: dto.slug,
          }),

          ...(dto.excerpt !==
            undefined && {
            excerpt: dto.excerpt,
          }),

          ...(dto.content !==
            undefined && {
            content: dto.content,
          }),

          ...(dto.image !==
            undefined && {
            image: dto.image,
          }),

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            pages.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }

  async publishPage(
    id: number,
  ) {
    const page =
      await this.findById(id);

    if (
      page.status ===
      PageStatus.PUBLISHED
    ) {
      throw new ConflictException(
        'Page is already published',
      );
    }

    const result =
      await db
        .update(pages)
        .set({
          status:
            PageStatus.PUBLISHED,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            pages.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }

  async unpublishPage(
    id: number,
  ) {
    const page =
      await this.findById(id);

    if (
      page.status !==
      PageStatus.PUBLISHED
    ) {
      throw new ConflictException(
        'Only published pages can be unpublished',
      );
    }

    const result =
      await db
        .update(pages)
        .set({
          status:
            PageStatus.DRAFT,

          updatedAt:
            new Date(),
        })
        .where(
          eq(
            pages.id,
            id,
          ),
        )
        .returning();

    return result[0];
  }
}