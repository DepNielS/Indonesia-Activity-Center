import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import {activityCategories, } from './activity-category.schema';

export const activityStatusEnum = pgEnum(
  'activity_status',
  [
    'DRAFT',
    'PUBLISHED',
  ],
);

export const activities = pgTable(
  'activities',
  {
    id: serial('id')
      .primaryKey(),

    categoryId: integer('category_id')
      .notNull()
      .references(
        () => activityCategories.id,
    ),


    name: varchar('name', {
      length: 150,
    }).notNull(),

    slug: varchar('slug', {
      length: 180,
    }).notNull().unique(),

    description: text('description')
      .notNull(),

    image: varchar('image', {
      length: 500,
    }),

    location: varchar('location', {
      length: 200,
    }),

    duration: varchar('duration', {
      length: 100,
    }),

    status: activityStatusEnum('status')
      .default('DRAFT')
      .notNull(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  },
);