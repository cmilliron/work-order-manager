import { NewApartment, Apartment, apartments } from "../schema.js";
import { db } from "../index.js";

export async function createApartment(
  apt_info: NewApartment,
): Promise<Apartment> {
  const result: Apartment[] = await db
    .insert(apartments)
    .values(apt_info)
    .returning();
  return result[0];
}
