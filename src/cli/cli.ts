import { Command } from "commander";
import { makeWorkOrderCommand } from "./commands/work-order.js";
import { makeAddTenantCommand } from "./commands/add-tenant.js";

export function workeOrderManager() {
  const program = new Command();

  program
    .name("Worker Order Manager")
    .description("A practical CLI tool for created worker orders")
    .version("0.1.0");

  // 2. Define options (flags)
  program
    .option("-d, --debug", "output extra debugging")
    .option("-s, --small", "small pizza size")
    .option("-p, --pizza-type ", "flavour of pizza");

  program.addCommand(makeWorkOrderCommand());
  program.addCommand(makeAddTenantCommand());

  // 3. Parse the arguments
  program.parse(process.argv);

  // 4. Extract options with explicit types
  // interface CLIOptions {
  //   debug?: boolean;
  //   small?: boolean;
  //   pizzaType?: string;
  // }

  // const options = program.opts();

  // // 5. App logic
  // if (options.debug) console.log('Current options:', options);
  // console.log(`Pizza type: ${options.pizzaType || 'no type selected'}`);
}
