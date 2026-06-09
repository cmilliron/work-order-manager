import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";

export enum Status {
  Empty,
  Pending,
  Occupied,
}

export const timestamps = {
  updated_at: text().default(sql`(CURRENT_TIMESTAMP)`),
  created_at: text().default(sql`(CURRENT_TIMESTAMP)`),
};

export const apartments = sqliteTable("apartments", {
  id: int().primaryKey({ autoIncrement: true }),
  address: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  slug: text().notNull(),
  rentPrice: int("rent_price").notNull(),
  status: int().default(Status.Empty),
  tenantId: text("tenent_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const workOrders = sqliteTable("work_orders", {
  id: int("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"), // 'pending', 'in-progress', 'completed'
  apartmentId: text("apartment_id")
    .notNull()
    .references(() => apartments.id, { onDelete: "cascade" }),
  tenantId: text("tenent_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

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

export type WorkOrder = InferSelectModel<typeof workOrders>;
export type NewWorkOrder = InferInsertModel<typeof workOrders>;

export type Apartment = InferSelectModel<typeof apartments>;
export type NewApartment = InferInsertModel<typeof apartments>;
