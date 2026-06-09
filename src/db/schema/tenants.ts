import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./column.helpers";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const tenants = sqliteTable("tenants", {
  id: int().primaryKey({ autoIncrement: true }),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text().unique(),
  phone: text().unique(),
  ...timestamps,
});

export type Tenant = InferSelectModel<typeof tenants>;
export type NewTenant = InferInsertModel<typeof tenants>;
