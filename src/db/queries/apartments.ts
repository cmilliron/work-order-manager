import {
  NewApartment,
  Apartment,
  apartments,
  ApartmentStatus,
  Tenant,
  tenants,
} from "../schema.js";
import { db } from "../index.js";
import { eq } from "drizzle-orm";

export type ApartmentWithUserTenant = {
  apartments: Apartment;
  tenants: Tenant | null;
};

// Create
export async function createApartment(
  apt_info: NewApartment,
): Promise<Apartment> {
  const result: Apartment[] = await db
    .insert(apartments)
    .values(apt_info)
    .returning();
  return result[0];
}
// Read
export async function getApartmentBySlug(slug: string): Promise<Apartment> {
  const result = await db
    .select()
    .from(apartments)
    .where(eq(apartments.slug, slug));
  return result[0];
}

export async function getAllApartments(): Promise<Apartment[]> {
  const results = await db.select().from(apartments);
  return results;
}

export async function getApartmentsWithTenents(): Promise<
  ApartmentWithUserTenant[]
> {
  const rows = await db
    .select()
    .from(apartments)
    .leftJoin(tenants, eq(apartments.tenantId, tenants.id));

  return rows;
}

// updates
export async function addTenantRelationToApartment(
  slug: string,
  tenantId: number,
): Promise<Apartment> {
  const result = await db
    .update(apartments)
    .set({ tenantId: tenantId, status: ApartmentStatus.Occupied })
    .where(eq(apartments.slug, slug))
    .returning();
  return result[0];
}
