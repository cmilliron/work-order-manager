import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, InferInsertModel, sql } from "drizzle-orm";

export enum ApartmentStatus {
  Empty,
  Pending,
  Occupied,
}

export enum WorkOrderStatus {
  Open,
  Started,
  OnHold,
  Completed,
}

export const timestamps = {
  created_at: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updated_at: text()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
};

export const apartments = sqliteTable("apartments", {
  id: int().primaryKey({ autoIncrement: true }),
  address: text().notNull(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  slug: text().notNull(),
  rentPrice: int("rent_price").notNull(),
  status: int().default(ApartmentStatus.Empty),
  tenantId: int("tenant_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const workOrders = sqliteTable("work_orders", {
  id: int("id").primaryKey({ autoIncrement: true }),
  description: text("description").notNull(),
  status: int("status").notNull().default(WorkOrderStatus.Open), // 'pending', 'in-progress', 'completed'
  apartmentId: int("apartment_id").references(() => apartments.id, {
    onDelete: "set null",
  }),
  tenantId: int("tenant_id").references(() => tenants.id, {
    onDelete: "set null",
  }),
  ...timestamps,
});

export const tenants = sqliteTable("tenants", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text(),
  phone1: text("phone_1"),
  phone2: text("phone_2"),
  ...timestamps,
});

export type Tenant = InferSelectModel<typeof tenants>;
export type NewTenant = InferInsertModel<typeof tenants>;

export type WorkOrder = InferSelectModel<typeof workOrders>;
export type NewWorkOrder = InferInsertModel<typeof workOrders>;

export type Apartment = InferSelectModel<typeof apartments>;
export type NewApartment = InferInsertModel<typeof apartments>;
