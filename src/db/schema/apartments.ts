import { uuid } from "drizzle-orm/gel-core";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "./column.helpers";
import { tenants } from "./tenants";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export enum Status {
  Empty,
  Pending,
  Occupied,
}

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

export type Apartment = InferSelectModel<typeof apartments>;
export type NewApartment = InferInsertModel<typeof apartments>;
