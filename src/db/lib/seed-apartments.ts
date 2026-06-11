import * as fs from "fs";
import * as path from "path";
import { createApartment } from "../queries/apartments.js";

// 1. Define the shape of your JSON data
interface ApartmentFromJSON {
  address: string;
  city: string;
  state: string;
  zip: string;
  slug: string;
  rent: number;
}

function readApartmentFile(): ApartmentFromJSON[] | null {
  try {
    const filePath = "./src/db/lib/seed-data/apartment_info.json";

    const rawData = fs.readFileSync(filePath, "utf-8");

    const jsonData: ApartmentFromJSON[] = JSON.parse(rawData);
    return jsonData;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return null;
  }
}

async function storeApartmentData() {
  const apartmentData = readApartmentFile();
  if (!apartmentData) {
    console.log("There was an error import the data.");
    process.exit(1);
  }
  for (let apartment of apartmentData) {
    console.log(apartment.slug);
    const result = await createApartment({
      address: apartment.address,
      city: apartment.city,
      state: apartment.state,
      zip: apartment.zip,
      slug: apartment.slug,
      rentPrice: apartment.rent,
    });
    console.log(`New Apartment: ${result.id} -> ${result.slug}`);
  }
}

storeApartmentData();
