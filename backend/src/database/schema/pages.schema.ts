import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const pageStatusEnum = pgEnum(
  'page_status',
  [
    'DRAFT',
    'PUBLISHED',
  ],
);

export const pages = pgTable('pages', {
  id: serial('id').primaryKey(),

  title: varchar('title', {
    length: 150,
  }).notNull(),

  slug: varchar('slug', {
    length: 180,
  }).notNull().unique(),

  excerpt: varchar('excerpt', {
    length: 300,
  }),

  content: text('content')
    .notNull(),

  image: varchar('image', {
    length: 500,
  }),

  status: pageStatusEnum('status')
    .default('DRAFT')
    .notNull(),

  createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull(),
});