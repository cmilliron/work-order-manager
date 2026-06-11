import * as fs from "fs";
import * as path from "path";
import {
  addTenantRelationToApartment,
  createApartment,
  getApartmentBySlug,
} from "../queries/apartments.js";
import { NewTenant } from "../schema.js";
import { createTenant } from "../queries/tenants.js";

// 1. Define the shape of your JSON data
interface TenantInfoRaw {
  name: string;
  phone: string;
  email: string;
}

interface TenantInfoClean {
  name: string;
  phone1: string;
  phone2: string;
  email: string;
}

interface TenantSlug {
  name: string;
  slug: string;
}

function readJSONFile<T>(filename: string): T[] | null {
  try {
    const filePath = "./src/db/lib/seed-data/" + filename;

    const rawData = fs.readFileSync(filePath, "utf-8");

    const jsonData: T[] = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

function processTenantInfo(data: TenantInfoRaw[]): TenantInfoClean[] {
  const cleanData: TenantInfoClean[] = [];
  for (let datum of data) {
    const newPhones = processPhoneNumber(datum.phone);
    cleanData.push({
      name: datum.name,
      phone1: newPhones[0] ?? "",
      phone2: newPhones[1] ?? "",
      email: datum.email,
    });
  }

  return cleanData;
}

async function storeTenantData() {
  const tenantInfo = readJSONFile<TenantInfoRaw>("tenant-info.json");
  const tenantSlugs = readJSONFile<TenantSlug>("tenant-slug.json");
  if (!tenantInfo || !tenantSlugs) {
    console.log("There was an error import the data.");
    process.exit(1);
  }
  console.log(tenantSlugs[0]);
  const tenantMap = createTenantSlugMap(tenantSlugs);
  const cleanTenants = processTenantInfo(tenantInfo);
  console.log(cleanTenants[0]);
  for (let tenant of cleanTenants.slice(0, 3)) {
    const newTenant: NewTenant = {
      name: tenant.name,
      phone1: tenant.phone1,
      phone2: tenant.phone2,
      email: tenant.email,
    };
    const result = await createTenant(newTenant);
    const slug = tenantMap.get(result.name);
    if (!slug) {
      console.log(`${result.id} with name ${result.name} no slug`);
      continue;
    }
    console.log(result.name, await getApartmentBySlug(slug));
    const updatedDB = await addTenantRelationToApartment(slug, result.id);
    console.log(updatedDB);
  }
}

function createTenantSlugMap(data: TenantSlug[]) {
  const userMap = new Map<string, string>();
  for (let { name, slug } of data) {
    console.log("createing: ", name, slug);
    userMap.set(name, slug);
  }
  return userMap;
}

function processPhoneNumber(phoneString: string): string[] {
  const phoneRegex = /\(\d{3}\)\s\d{3}-\d{4}/g;
  const matches = phoneString.match(phoneRegex);
  return matches ? matches : [];
}

storeTenantData();
