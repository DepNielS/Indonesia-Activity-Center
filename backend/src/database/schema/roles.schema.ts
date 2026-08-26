import {
    pgTable,
    serial,
    varchar,
    timestamp,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),

    name: varchar('name', {
        length: 50, 
    }).notNull().unique(),

    createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),
});