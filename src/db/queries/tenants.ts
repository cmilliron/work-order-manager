import { NewTenant, tenants } from "../schema.js";
import { db } from "../index.js";

export async function createTenant(tenant: NewTenant) {
  const result = await db.insert(tenants).values(tenant).returning();
  const newTenant = result[0];
  return newTenant;
}
