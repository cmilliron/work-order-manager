import { Command } from "commander";
import { createNewTenant } from "../services/create-new-tenant.js";

export function makeAddTenantCommand(): Command {
  return (
    new Command("edit-tenant")
      .description("Add new tenant")
      // .option('-e, --env <environment>', 'target environment', 'staging')
      .action(async () => {
        // add options later options: { }
        await // editTenant();
        
      })
  );
}
