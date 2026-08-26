import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const eventStatusEnum = pgEnum(
  'event_status',
  [
    'DRAFT',
    'PUBLISHED',
    'CANCELLED',
  ],
);

export const events = pgTable('events', {
  id: serial('id').primaryKey(),

  title: varchar('title', {
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

  startAt: timestamp('start_at')
    .notNull(),

  endAt: timestamp('end_at')
    .notNull(),

  location: varchar('location', {
    length: 200,
  }),

  status: eventStatusEnum('status')
    .default('DRAFT')
    .notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
});