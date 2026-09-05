import {
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const activityCategories =
  pgTable('activity_categories', {
    id: serial('id')
      .primaryKey(),

    name: varchar('name', {
      length: 100,
    }).notNull().unique(),

    slug: varchar('slug', {
      length: 120,
    }).notNull().unique(),

    createdAt: timestamp('created_at')
      .defaultNow()
      .notNull(),

    updatedAt: timestamp('updated_at')
      .defaultNow()
      .notNull(),
  });