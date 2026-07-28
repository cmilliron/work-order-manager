// import { createInterface, Interface } from "readline";
import * as p from "@clack/prompts";
import {
  ApartmentWithUserTenant,
  getApartmentsWithTenents,
} from "../../db/queries/apartments.js";
import { NewTenant, Tenant, tenants } from "../../db/schema.js";
import { SocketAddress } from "node:net";
import { printOutput } from "../utils/output.js";
import { createTenant } from "../../db/queries/tenants.js";

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

  const apartment = await p.select({
    message: "Pick and apartment",
    options: selectOptions,
  });

  const workOrder = await p.text({
    message: "What is the issue with the apartment: ",
  });

  printOutput(apartment as ApartmentWithUserTenant, workOrder as string);
}
