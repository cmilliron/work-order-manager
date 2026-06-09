import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
// import { sql } from "drizzle-orm";
import { apartments } from "./apartments";
import { tenants } from "./tenants";
import { timestamps } from "./column.helpers";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export const workOrders = sqliteTable("work_orders", {
  id: integer("id").primaryKey({ autoIncrement: true }),
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

export type WorkOrder = InferSelectModel<typeof workOrders>;
export type NewWorkOrder = InferInsertModel<typeof workOrders>;
