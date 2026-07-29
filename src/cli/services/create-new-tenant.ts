// import { createInterface, Interface } from "readline";
import * as p from "@clack/prompts";
import {
  ApartmentWithUserTenant,
  getApartmentsWithTenents,
} from "../../db/queries/apartments.js";
import { Apartment, NewTenant, Tenant, tenants } from "../../db/schema.js";
import { createTenant } from "../../db/queries/tenants.js";
import { addTenantRelationToApartment } from "../../db/queries/apartments.js";

export async function createNewTenant() {
  const newTenantName = await p.text({
    message: "Enter the name of the new tenant: ",
  });
  const newTenantEmail = await p.text({
    message: "Enter the tenant's email: ",
  });
  const newTenantPhone1 = await p.text({
    message: "Enter the tenant's phone 1: ",
  });
  const newTenantPhone2 = await p.text({
    message: "Enter the tenant's phone 2: ",
  });

  const newTenant: NewTenant = {
    name: newTenantName as string,
    email: newTenantEmail as string,
    phone1: newTenantPhone1 as string,
    phone2: newTenantPhone2 as string,
  };

  const newTenantDb = await createTenant(newTenant);

  const apartments = await getApartmentsWithTenents();

  const search = await p.text({
    message: "Enter a name or apartement to search: ",
  });

  const options = apartments.filter((r) => {
    return r.apartments.slug
      .toLowerCase()
      .includes(search.toString().toLowerCase());
  });

  const selectOptions = options.map((o) => {
    return {
      value: o,
      label: `${o.tenants?.name} - ${o.apartments.address}`,
    };
  });

  const apartment = (await p.select({
    message: "Pick and apartment",
    options: selectOptions,
  })) as ApartmentWithUserTenant;

  const updatedDB = await addTenantRelationToApartment(
    apartment.apartments.slug,
    newTenantDb.id,
  );

  printAppartment(updatedDB);
  printTenant(newTenantDb);
}

function printAppartment(apartment: Apartment) {
  console.log("Adress: ", apartment.address);
  console.log("Rent: ", apartment.rentPrice);
  console.log("Tenant: ", apartment.tenantId);
  console.log("Slug: ", apartment.slug);
}

function printTenant(tenant: Tenant) {
  console.log("Name: ", tenant.name);
  console.log("Phone 1: ", tenant.phone1);
  console.log("Phone 2: ", tenant.phone2);
  console.log("Email: ", tenant.email);
  console.log("ID: ", tenant.id);
}
