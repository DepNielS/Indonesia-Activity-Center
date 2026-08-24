import { from } from "rxjs";
import {
    pgTable,
    serial,
    varchar,
    timestamp,
    integer,
    boolean,
} from 'drizzle-orm/pg-core';

import { roles } from "./roles.schema";

export const users = pgTable('users', {
    id: serial ('id').primaryKey(),

    name: varchar('name', {
        length: 100,
    }).notNull(),

    email: varchar('email', {
        length: 150,
    }).notNull().unique(),

    password: varchar('password', {
        length: 250,
    }).notNull(),

    roleId: integer('role_id')
    .notNull()
    .references(() => roles.id),

    isActive: boolean('is_active')
    .default(true)
    .notNull(),

    createdAt: timestamp('created_at')
    .defaultNow()
    .notNull(),

    updatedAt: timestamp('update_at')
    .defaultNow()
    .notNull(),
});
