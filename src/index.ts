// import { createInterface, Interface } from "readline";
import * as p from "@clack/prompts";
import { getApartmentsWithTenents } from "./db/queries/apartments.js";

async function main() {
  const search = await p.text({
    message: "Enter a name or apartement to search: ",
  });
  // console.log(search);
  //   const r = createInterface({
  //     input: process.stdin,
  //     output: process.stdout,
  //     prompt: "Let's add a work order (Search for Name): ",
  //   });
  const results = await getApartmentsWithTenents();
  // console.log(results[0]);
  //   r.prompt();
  //   r.on("line", (input) => {});
  // }
  const options = results.filter((r) => {
    return (
      r.apartments.slug.toLocaleLowerCase().includes(search.toString()) ||
      r.tenants?.name.toLowerCase().includes(search.toString())
    );
  });

  console.log(options);
}

main();
