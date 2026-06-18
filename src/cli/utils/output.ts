import { ApartmentWithUserTenant } from "../../db/queries/apartments.js";

export function printOutput(
  apartment: ApartmentWithUserTenant,
  workOrder: string = "testing",
) {
  const { address, city, state, zip } = apartment.apartments;
  let [name, phone1, phone2] = ["Empty", "", ""];

  if (apartment.tenants) {
    name = apartment.tenants.name;
    phone1 = apartment.tenants.phone1 || "";
    phone2 = apartment.tenants.phone2 || "";
  }
  console.log("\n==============================================");
  console.log("Work Order:");
  console.log(`Address: ${address}, ${city}, ${state} ${zip}`);
  console.log(`Name: ${name}`);
  console.log(`Phone: ${phone1}${phone2 && ` , ${phone2}`}`);
  console.log(`Issue: ${workOrder}`);
}
