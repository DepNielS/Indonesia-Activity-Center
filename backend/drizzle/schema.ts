import { pgTable, unique, serial, varchar, timestamp, foreignKey, integer, boolean, text, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const activityStatus = pgEnum("activity_status", ['DRAFT', 'PUBLISHED'])
export const eventStatus = pgEnum("event_status", ['DRAFT', 'PUBLISHED', 'CANCELLED'])
export const pageStatus = pgEnum("page_status", ['DRAFT', 'PUBLISHED'])


export const roles = pgTable("roles", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 50 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("roles_name_unique").on(table.name),
]);

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 100 }).notNull(),
	email: varchar({ length: 150 }).notNull(),
	password: varchar({ length: 250 }).notNull(),
	roleId: integer("role_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	isActive: boolean("is_active").default(true).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.roleId],
			foreignColumns: [roles.id],
			name: "users_role_id_roles_id_fk"
		}),
	unique("users_email_unique").on(table.email),
]);

export const events = pgTable("events", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 180 }).notNull(),
	description: text().notNull(),
	image: varchar({ length: 500 }),
	startAt: timestamp("start_at", { mode: 'string' }).notNull(),
	endAt: timestamp("end_at", { mode: 'string' }).notNull(),
	location: varchar({ length: 200 }),
	status: eventStatus().default('DRAFT').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("events_slug_unique").on(table.slug),
]);

export const pages = pgTable("pages", {
	id: serial().primaryKey().notNull(),
	title: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 180 }).notNull(),
	excerpt: varchar({ length: 300 }),
	content: text().notNull(),
	image: varchar({ length: 500 }),
	status: pageStatus().default('DRAFT').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("pages_slug_unique").on(table.slug),
]);

export const activities = pgTable("activities", {
	id: serial().primaryKey().notNull(),
	name: varchar({ length: 150 }).notNull(),
	slug: varchar({ length: 180 }).notNull(),
	description: text().notNull(),
	image: varchar({ length: 500 }),
	location: varchar({ length: 200 }),
	duration: varchar({ length: 100 }),
	status: activityStatus().default('DRAFT').notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	unique("activities_slug_unique").on(table.slug),
]);
