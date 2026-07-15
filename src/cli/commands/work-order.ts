import { Command } from "commander";
import { createWorkOrder } from "../services/create-work-order.js";

export const makeWorkOrderCommand = (): Command => {
  return (
    new Command("work-order")
      .description("Creates a new workorder")
      // .option('-e, --env <environment>', 'target environment', 'staging')
      .action(async () => {
        // add options later options: { }
        await createWorkOrder();
      })
  );
};
