// import { createInterface, Interface } from "readline";
import * as p from "@clack/prompts";
import {
  ApartmentWithUserTenant,
  getApartmentsWithTenents,
} from "../../db/queries/apartments.js";
import { tenants } from "../../db/schema.js";
import { SocketAddress } from "node:net";
import { printOutput } from "../utils/output.js";

export async function createWorkOrder() {
  const search = await p.text({
    message: "Enter a name or apartement to search: ",
  });
  // console.log(search);
  //   const r = createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //     prompt: "Let's add a work order (Search for Name): ",
  //   });
  const apartments = await getApartmentsWithTenents();
  // console.log(results[0]);
  //   r.prompt();
  //   r.on("line", (input) => {});
  // }
  const options = apartments.filter((r) => {
    return (
      r.apartments.slug
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      r.tenants?.name.toLowerCase().includes(search.toString().toLowerCase())
    );
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

  // Add work order to
}
