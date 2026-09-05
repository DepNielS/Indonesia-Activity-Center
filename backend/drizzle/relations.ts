import { relations } from "drizzle-orm/relations";
import { roles, users } from "./schema";

export const usersRelations = relations(users, ({one}) => ({
	role: one(roles, {
		fields: [users.roleId],
		references: [roles.id]
	}),
}));

export const rolesRelations = relations(roles, ({many}) => ({
	users: many(users),
}));